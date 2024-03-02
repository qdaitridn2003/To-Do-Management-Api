import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ProfileEntity } from './profile.entity';
import { TaskEntity } from './task.entity';

@Entity({ name: 'groups' })
export class GroupEntity {
  @PrimaryColumn({ default: uuid() })
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @ManyToMany(() => ProfileEntity)
  @JoinTable({
    name: 'groups_profiles',
    joinColumn: { name: 'groupId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'profileId', referencedColumnName: 'id' },
  })
  profiles: ProfileEntity[];

  @ManyToOne(() => ProfileEntity, (profile) => profile.ownerGroups)
  owner: ProfileEntity;

  @OneToMany(() => TaskEntity, (task) => task.group)
  tasks: TaskEntity[];

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
