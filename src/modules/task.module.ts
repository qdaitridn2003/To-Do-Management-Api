import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from '../controllers';
import { GroupEntity, TaskEntity } from '../entities';
import { TaskService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, GroupEntity])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
