import { PriorityEnum, StatusEnum } from '../commons';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { TaskEntity } from './task.entity';

@Entity({ name: 'subtasks' })
export class SubTaskEntity {
  @PrimaryColumn({ default: uuid() })
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.Todo })
  status: string;

  @Column({ type: 'enum', enum: PriorityEnum })
  priority: string;

  @ManyToOne(() => TaskEntity)
  task: TaskEntity;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
