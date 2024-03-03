import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AccountEntity, ProfileEntity } from '../entities';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from './mailer.service';
import {
  AccountInfo,
  ChangePasswordParams,
  JwtPayload,
  LoginAccountParams,
  RegisterAccountParams,
  ResetPasswordParams,
  SetPasswordParams,
} from '../types';
import { hashHandler, otpHandler } from '../utils';

@Injectable({})
export class AuthService {
  constructor(
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(MailerService) private mailerService: MailerService,
    @InjectRepository(AccountEntity)
    private accountRepo: Repository<AccountEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepo: Repository<ProfileEntity>,
  ) {}

  // NOTE: Generate JWT Token
  async generateJwtToken(jwtPayload: JwtPayload) {
    const token = await this.jwtService.sign(jwtPayload, {
      algorithm: 'HS256',
      expiresIn: '1h',
      secret: process.env.JWT_SECRET,
    });
    return token;
  }

  async registerLocalAccount(params: RegisterAccountParams) {
    const foundAccount = await this.accountRepo.findOneBy({
      username: params.username,
    });

    if (foundAccount) {
      throw new HttpException('Account already exists', HttpStatus.BAD_REQUEST);
    }

    if (params.password !== params.confirmPassword)
      throw new HttpException(
        'Confirm password and password not match together',
        HttpStatus.BAD_REQUEST,
      );

    const hashPassword = await hashHandler.generate(params.password);
    const createdAccount = this.accountRepo.create({
      username: params.username,
      password: hashPassword,
    });
    await this.accountRepo.save(createdAccount);

    return { message: 'Register account successfully' };
  }

  async loginLocalAccount(params: LoginAccountParams) {
    const foundAccount = await this.accountRepo.findOne({
      where: { username: params.username },
      relations: ['profile'],
    });
    if (!foundAccount)
      throw new HttpException('Account is not exist', HttpStatus.NOT_FOUND);

    const comparedPassword = await hashHandler.verify(
      foundAccount.password,
      params.password,
    );
    if (!comparedPassword)
      throw new HttpException(
        'Password is not correct',
        HttpStatus.BAD_REQUEST,
      );
    let token;
    if (foundAccount.profile) {
      token = await this.generateJwtToken({
        id: foundAccount.id,
        role: foundAccount.role,
        profileId: foundAccount.profile.id,
        strategy: foundAccount.strategy,
      });
      return { accessToken: token };
    }
    return {
      profileId: null,
      authId: foundAccount.id,
    };
  }

  async sendOTPToEmail(email: string) {
    const otp = otpHandler.generate(process.env.OTP_SECRET);
    await this.mailerService.sendOtpToEmail(email, otp);
    return { message: 'OTP have sent to email' };
  }

  async verifyOTPToConfirmRequest(otp: string) {
    const verifiedResult = otpHandler.verify(process.env.OTP_SECRET, otp);
    return {
      verify: verifiedResult,
      message: verifiedResult
        ? 'Verify OTP successfully'
        : 'OTP was invalid or expired',
    };
  }

  async resetPassword(params: ResetPasswordParams) {
    const foundAccount = await this.accountRepo.findOneBy({
      username: params.username,
    });

    if (!foundAccount) {
      throw new HttpException('Account is not exist', HttpStatus.NOT_FOUND);
    }

    if (params.password !== params.confirmPassword)
      throw new HttpException(
        'Confirm password and password not match together',
        HttpStatus.BAD_REQUEST,
      );

    const hashPassword = await hashHandler.generate(params.password);
    foundAccount.password = hashPassword;
    await this.accountRepo.save(foundAccount);
    return { message: 'Reset password successfully' };
  }

  async changePassword(authId: string, params: ChangePasswordParams) {
    const foundAccount = await this.accountRepo.findOneBy({ id: authId });
    if (!foundAccount)
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);

    const comparedPassword = await hashHandler.verify(
      foundAccount.password,
      params.oldPassword,
    );
    if (!comparedPassword)
      throw new HttpException(
        'Old password is not correct',
        HttpStatus.BAD_REQUEST,
      );

    if (params.newPassword !== params.confirmPassword)
      throw new HttpException(
        'Confirm password and new password not match together',
        HttpStatus.BAD_REQUEST,
      );

    const hashPassword = await hashHandler.generate(params.newPassword);
    foundAccount.password = hashPassword;
    await this.accountRepo.save(foundAccount);

    return { message: 'Change password successfully' };
  }

  async setPassword(authId: string, params: SetPasswordParams) {
    const foundAccount = await this.accountRepo.findOneBy({ id: authId });
    if (!foundAccount)
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);

    if (params.password !== params.confirmPassword)
      throw new HttpException(
        'Confirm password and password not match together',
        HttpStatus.BAD_REQUEST,
      );

    const hashPassword = await hashHandler.generate(params.password);
    foundAccount.password = hashPassword;
    await this.accountRepo.save(foundAccount);

    return { message: 'Set password successfully' };
  }

  // NOTE: Login With Google And Facebook
  async validateAccount(info: AccountInfo) {
    const foundAccount = await this.accountRepo.findOne({
      where: { username: info.email, strategy: info.provider },
      relations: ['profile'],
    });

    if (foundAccount) {
      return {
        accessToken: await this.generateJwtToken({
          id: foundAccount.id,
          profileId: foundAccount.profile.id,
          role: foundAccount.role,
          strategy: info.provider,
        }),
      };
    }

    const createdProfile = await this.profileRepo.create({
      firstName: info.firstName,
      subName: info.subName,
      lastName: info.lastName,
      avatar: info.avatar,
    });
    await this.profileRepo.save(createdProfile);

    const foundToCheckDuplicateAccount = await this.accountRepo.findOneBy({
      username: info.email,
    });
    if (foundToCheckDuplicateAccount)
      return { message: 'Account already exists' };

    const createdAccount = await this.accountRepo.create({
      username: info.email,
      strategy: info.provider,
      profile: createdProfile,
    });
    await this.accountRepo.save(createdAccount);

    return {
      accessToken: await this.generateJwtToken({
        id: createdAccount.id,
        profileId: createdProfile.id,
        role: createdAccount.role,
        strategy: createdAccount.strategy,
      }),
    };
  }
}
