import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupController } from '../controllers';
import { GroupEntity, ProfileEntity } from '../entities';
import { GroupService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity, ProfileEntity])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
