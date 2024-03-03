import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaDataKey } from '../commons';

import { AuthController } from '../controllers';
import { AccountEntity, ProfileEntity } from '../entities';
import { AuthService, MailerService } from '../services';
import { FacebookStrategy, GoogleStrategy, SessionSerializer } from '../utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity, ProfileEntity]),
    PassportModule.register({ session: true }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    MailerService,
    GoogleStrategy,
    FacebookStrategy,
    SessionSerializer,
    {
      provide: MetaDataKey.AuthService,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
