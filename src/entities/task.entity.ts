import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { PriorityEnum, StatusEnum } from 'src/commons';
import { GroupEntity } from './group.entity';
import { SubTaskEntity } from './sub-task.entity';

@Entity('tasks')
export class TaskEntity {
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

  @ManyToOne(() => GroupEntity, (group) => group.tasks)
  group: GroupEntity;

  @OneToMany(() => SubTaskEntity, (subtask) => subtask.task)
  subtasks: SubTaskEntity[];

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
