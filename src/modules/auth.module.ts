import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaDataKey } from 'src/commons';

import { AuthController } from 'src/controllers';
import { AccountEntity, ProfileEntity } from 'src/entities';
import { AuthService, MailerService } from 'src/services';
import { FacebookStrategy, GoogleStrategy, SessionSerializer } from 'src/utils';

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
