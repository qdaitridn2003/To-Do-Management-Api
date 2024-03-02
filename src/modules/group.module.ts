import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupController } from 'src/controllers';
import { GroupEntity, ProfileEntity } from 'src/entities';
import { GroupService } from 'src/services';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity, ProfileEntity])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
