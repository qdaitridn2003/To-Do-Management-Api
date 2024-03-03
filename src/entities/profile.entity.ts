import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { GenderEnum } from '../commons';
import { GroupEntity } from './group.entity';

@Entity({ name: 'profiles' })
export class ProfileEntity {
  @PrimaryColumn({ default: uuid() })
  @Generated('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column({ default: '' })
  subName: string;

  @Column()
  lastName: string;

  @Column({ type: 'enum', enum: GenderEnum, nullable: true })
  gender: string;

  @Column({ type: 'date', nullable: true })
  birthday: Date;

  @Column({ nullable: true })
  avatar: string;

  @ManyToMany(() => GroupEntity)
  @JoinTable({
    name: 'groups_profiles',
    joinColumn: { name: 'profileId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'groupId', referencedColumnName: 'id' },
  })
  groups: GroupEntity[];

  @OneToMany(() => GroupEntity, (group) => group.owner)
  ownerGroups: GroupEntity[];

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
