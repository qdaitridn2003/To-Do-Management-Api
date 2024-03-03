import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { RoleEnum, StrategyEnum } from '../commons';
import { ProfileEntity } from './profile.entity';

@Entity({ name: 'accounts' })
export class AccountEntity {
  @PrimaryColumn({ default: uuid() })
  @Generated('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.User })
  role: string;

  @Column({ type: 'enum', enum: StrategyEnum, default: StrategyEnum.Local })
  strategy: string;

  @OneToOne(() => ProfileEntity)
  @JoinColumn()
  profile: ProfileEntity;

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
