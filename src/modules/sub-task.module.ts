import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubTaskController } from 'src/controllers';
import { SubTaskEntity, TaskEntity } from 'src/entities';
import { SubTaskService } from 'src/services';

@Module({
  imports: [TypeOrmModule.forFeature([SubTaskEntity, TaskEntity])],
  controllers: [SubTaskController],
  providers: [SubTaskService],
})
export class SubTaskModule {}
