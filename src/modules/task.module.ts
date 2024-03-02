import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from 'src/controllers';
import { GroupEntity, TaskEntity } from 'src/entities';
import { TaskService } from 'src/services';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, GroupEntity])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
