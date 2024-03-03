import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { MetaDataKey, StrategyEnum } from '../../commons';
import { AuthService } from '../../services';
import { AccountInfo } from '../../types';

@Injectable({})
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(MetaDataKey.AuthService) private authService: AuthService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: false,
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const accountInfo: AccountInfo = {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      subName: profile.name.middleName,
      provider: StrategyEnum.Google,
      email: profile.emails[0].value,
      avatar: profile.photos[0].value,
    };
    const token = await this.authService.validateAccount(accountInfo);

    return token;
  }
}
