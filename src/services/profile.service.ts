import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidV4 } from 'uuid';

import { AccountEntity, ProfileEntity } from 'src/entities';
import { AddProfileParams, EditProfileParams } from 'src/types';
import { FirebaseService } from './firebase.service';

@Injectable({})
export class ProfileService {
  constructor(
    private firebaseService: FirebaseService,
    @Inject(JwtService) private jwtService: JwtService,
    @InjectRepository(ProfileEntity)
    private profileRepo: Repository<ProfileEntity>,
    @InjectRepository(AccountEntity)
    private accountRepo: Repository<AccountEntity>,
  ) {}

  async addProfile(params: AddProfileParams) {
    const foundAccount = await this.accountRepo.findOneBy({
      id: params.authId,
    });

    if (!foundAccount) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    const createdProfile = await this.profileRepo.create({
      firstName: params.firstName,
      lastName: params.lastName,
      subName: params.subName,
      birthday: params.birthday,
      gender: params.gender,
      avatar: params.avatar,
    });
    await this.profileRepo.save(createdProfile);

    foundAccount.profile = createdProfile;
    await this.accountRepo.save(foundAccount);

    const token = await this.jwtService.sign(
      {
        id: foundAccount.id,
        profileId: createdProfile.id,
        role: foundAccount.role,
        strategy: foundAccount.strategy,
      },
      {
        algorithm: 'HS256',
        expiresIn: '1h',
        secret: process.env.JWT_SECRET,
      },
    );
    return { accessToken: token };
  }

  async uploadAvatar(file: Express.Multer.File) {
    const storage = this.firebaseService.getFirebaseStorageInstance();
    const bucket = storage.bucket();

    const fileName = uuidV4();
    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (error) => reject(error));
      stream.on('finish', () => {
        const imageURL = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileName}?alt=media`;
        resolve(imageURL);
      });
      stream.end(file.buffer);
    });
  }

  async editProfile(profileId: string, param: EditProfileParams) {
    const foundProfile = await this.profileRepo.findOneBy({ id: profileId });
    if (!foundProfile)
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    foundProfile.firstName = param.firstName;
    foundProfile.lastName = param.lastName;
    foundProfile.subName = param.subName;
    foundProfile.birthday = param.birthday;
    foundProfile.gender = param.gender;
    foundProfile.avatar = param.avatar;

    await this.profileRepo.save(foundProfile);

    return { message: 'Change profile successfully' };
  }

  async getProfile(profileId: string) {
    const foundProfile = await this.profileRepo.findOne({
      where: { id: profileId },
      relations: ['groups'],
    });
    if (!foundProfile)
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    return { profile: foundProfile };
  }
}
