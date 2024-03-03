import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubTaskController } from '../controllers';
import { SubTaskEntity, TaskEntity } from '../entities';
import { SubTaskService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([SubTaskEntity, TaskEntity])],
  controllers: [SubTaskController],
  providers: [SubTaskService],
})
export class SubTaskModule {}
