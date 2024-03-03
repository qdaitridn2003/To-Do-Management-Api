import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

import { MetaDataKey, StrategyEnum } from '../../commons';
import { AuthService } from '../../services';
import { AccountInfo } from '../../types';

@Injectable({})
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(MetaDataKey.AuthService) private authService: AuthService,
  ) {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      passReqToCallback: false,
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(profile);
    const accountInfo: AccountInfo = {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      subName: profile.name.middleName ?? '',
      provider: StrategyEnum.Facebook,
      email: profile.emails[0].value,
      avatar: profile.photos?.[0].value ?? null,
    };
    const token = await this.authService.validateAccount(accountInfo);

    return token;
  }
}
