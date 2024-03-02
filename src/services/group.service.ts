import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GroupEntity, ProfileEntity } from 'src/entities';
import { GroupParams } from 'src/types';
import { paginationHelper } from 'src/utils';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity) private groupRepo: Repository<GroupEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepo: Repository<ProfileEntity>,
  ) {}

  async addGroup(ownerId: string, params: GroupParams) {
    const createdGroup = await this.groupRepo.create({
      name: params.name,
      owner: { id: ownerId },
      profiles: [{ id: ownerId }],
      description: params.description,
    });
    await this.groupRepo.save(createdGroup);
    return { message: 'Create group successfully' };
  }

  async editGroup(ownerId: string, groupId: string, params: GroupParams) {
    const foundGroup = await this.groupRepo.findOne({
      where: { id: groupId },
      relations: ['owner'],
    });
    if (!foundGroup)
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);

    if (foundGroup.owner.id !== ownerId) {
      throw new HttpException(
        'This owner group is not you',
        HttpStatus.UNAUTHORIZED,
      );
    }

    foundGroup.name = params.name;
    foundGroup.description = params.description;
    await this.groupRepo.save(foundGroup);
    return { message: 'Edit group successfully' };
  }

  async removeGroup(groupId: string) {
    const foundGroup = await this.groupRepo.findOneBy({ id: groupId });
    if (!foundGroup)
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);

    await this.groupRepo.remove(foundGroup);
    return { message: 'Delete group successfully' };
  }

  async getDetailGroup(groupId: string) {
    const foundGroup = await this.groupRepo.findOne({
      where: { id: groupId },
      relations: ['profiles'],
    });
    if (!foundGroup)
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    return { group: foundGroup };
  }

  async getAllGroup(
    limit: number = 10,
    page: number = 1,
    name?: string,
    startDate?: string,
    endDate?: string,
  ) {
    const offset = paginationHelper(limit, page);
    const groupQueryBuilder = this.groupRepo.createQueryBuilder('groups');
    const groupQuery = groupQueryBuilder
      .select('*')
      .orderBy('groups.createdAt', 'DESC');

    if (name) {
      groupQuery.andWhere('groups.name LIKE :name', { name: `%${name}%` });
    }

    if (startDate && endDate) {
      if (!(new Date(startDate) <= new Date(endDate))) {
        throw new HttpException(
          'startDate must be less than or equal to endDate',
          HttpStatus.BAD_REQUEST,
        );
      }
      groupQuery.andWhere(
        'DATE(groups.createdAt) >= :startDate AND DATE(groups.createdAt) <= :endDate',
        { startDate, endDate },
      );
    }

    const listGroup = await groupQuery.skip(offset).take(limit).getRawMany();
    const totalGroup = await groupQuery.getCount();

    return { listGroup, totalGroup };
  }

  async workingWithGroup(
    groupId: string,
    profileId: string,
    type: 'join' | 'leave',
  ) {
    const foundProfile = await this.profileRepo.findOneBy({ id: profileId });
    const foundGroup = await this.groupRepo.findOne({
      where: { id: groupId },
      relations: ['profiles', 'owner'],
    });

    if (!foundGroup)
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);

    let message;
    const isProfileAlreadyExistInGroup = foundGroup.profiles.some(
      (profile: ProfileEntity) => profile.id === profileId,
    );

    if (foundGroup.owner.id === profileId) {
      return { message: 'You are the owner group so you cannot leave or join' };
    }

    if (type === 'join') {
      if (isProfileAlreadyExistInGroup) {
        return { message: 'You have joined this group' };
      }

      foundGroup.profiles = [...foundGroup.profiles, foundProfile];

      message = 'Join group successfully';
    }

    if (type === 'leave') {
      if (!isProfileAlreadyExistInGroup) {
        return { message: 'You have not joined this group' };
      }
      const deleteProfileList = foundGroup.profiles.filter(
        (profile: ProfileEntity) => profile.id !== profileId,
      );
      foundGroup.profiles = deleteProfileList;
      message = 'Leave group successfully';
    }
    await this.groupRepo.save(foundGroup);
    return { message };
  }
}
