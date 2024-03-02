import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileController } from 'src/controllers';
import { AccountEntity, ProfileEntity } from 'src/entities';
import { ProfileService } from 'src/services';
import { FirebaseModule } from './firebase.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileEntity, AccountEntity]),
    FirebaseModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService, JwtService],
})
export class ProfileModule {}
