import {
  Body,
  Controller,
  Get,
  Put,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import {
  FacebookAuthGuard,
  GoogleAuthGuard,
  CheckStrategyGuard,
} from 'src/guards';
import { AuthService } from 'src/services';
import {
  ChangePasswordDTO,
  LoginDTO,
  OtpDTO,
  PasswordDTO,
  SetPasswordDTO,
  UsernameDTO,
} from 'src/dtos';
import { JwtPayload } from 'src/types';
import { StrategyDecorator } from 'src/decorators';
import { StrategyEnum } from 'src/commons';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  signInWithLocal(@Body() body: LoginDTO) {
    return this.authService.loginLocalAccount(body);
  }

  @Post('/sign-up')
  signUpWithLocal(@Body() body: PasswordDTO) {
    return this.authService.registerLocalAccount(body);
  }

  @Post('/send-otp')
  sendOTPToConfirmRequest(@Body() body: UsernameDTO) {
    return this.authService.sendOTPToEmail(body.username);
  }

  @Post('/verify-otp')
  verifyOTPToConfirmRequest(@Body() body: OtpDTO) {
    return this.authService.verifyOTPToConfirmRequest(body.otp);
  }

  @Post('/sign-in/google')
  signInWithGoogle() {
    return { link: process.env.GOOGLE_CALLBACK_URL };
  }

  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  @ApiExcludeEndpoint(true)
  redirectLoginGoogle(@Req() req: Request) {
    return req.user;
  }

  @Post('/sign-in/facebook')
  signInWithFacebook() {
    return { link: process.env.FACEBOOK_CALLBACK_URL };
  }

  @Get('/facebook/redirect')
  @ApiExcludeEndpoint(true)
  @UseGuards(FacebookAuthGuard)
  redirectLoginFacebook(@Req() req: Request) {
    return req.user;
  }

  @Put('/password/reset')
  resetPassword(@Body() body: PasswordDTO) {
    return this.authService.resetPassword(body);
  }

  @Put('/password/change')
  @ApiBearerAuth()
  changePassword(@Req() req: Request, @Body() body: ChangePasswordDTO) {
    const { id } = req['auth'] as JwtPayload;
    return this.authService.changePassword(id, body);
  }

  @Put('/password/set')
  @ApiBearerAuth()
  @UseGuards(CheckStrategyGuard)
  @StrategyDecorator(StrategyEnum.Google, StrategyEnum.Facebook)
  setPassword(@Req() req: Request, @Body() body: SetPasswordDTO) {
    const { id } = req['auth'] as JwtPayload;
    return this.authService.setPassword(id, body);
  }
}
