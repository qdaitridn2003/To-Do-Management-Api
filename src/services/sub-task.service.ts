import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SubTaskEntity, TaskEntity } from '../entities';
import { SubTaskParams } from '../types';
import { paginationHelper } from '../utils';

@Injectable()
export class SubTaskService {
  constructor(
    @InjectRepository(SubTaskEntity)
    private subTaskRepo: Repository<SubTaskEntity>,
    @InjectRepository(TaskEntity)
    private taskRepo: Repository<TaskEntity>,
  ) {}

  async addSubTask(params: SubTaskParams) {
    const createdTask = await this.subTaskRepo.create({
      name: params.name,
      description: params.description,
      priority: params.priority,
      task: { id: params.taskId },
    });
    await this.subTaskRepo.save(createdTask);
    return { message: 'Create sub task successfully' };
  }

  async editSubTask(subTaskId: string, params: SubTaskParams) {
    const foundSubTask = await this.subTaskRepo.findOneBy({ id: subTaskId });
    const foundTask = await this.taskRepo.findOneBy({ id: params.taskId });
    if (!foundSubTask) {
      throw new HttpException('Sub task not found', HttpStatus.NOT_FOUND);
    }
    foundSubTask.name = params.name;
    foundSubTask.description = params.description;
    foundSubTask.task = foundTask;
    foundSubTask.priority = params.priority;
    foundSubTask.status = params.status;
    await this.subTaskRepo.save(foundSubTask);
    return { message: 'Update sub task successfully' };
  }

  async removeSubTask(subTaskId: string) {
    const foundSubTask = await this.subTaskRepo.findOneBy({ id: subTaskId });
    if (!foundSubTask) {
      throw new HttpException('Sub task not found', HttpStatus.NOT_FOUND);
    }
    await this.subTaskRepo.remove(foundSubTask);
    return { message: 'Delete sub task successfully' };
  }

  async getDetailSubTask(subTaskId: string) {
    const foundSubTask = await this.subTaskRepo.findOne({
      where: { id: subTaskId },
      relations: ['task'],
    });
    if (!foundSubTask) {
      throw new HttpException('Sub task not found', HttpStatus.NOT_FOUND);
    }
    return { subTask: foundSubTask };
  }

  async getAllSubTask(
    limit: number = 10,
    page: number = 1,
    name?: string,
    status?: string,
    startDate?: string,
    endDate?: string,
  ) {
    const offset = paginationHelper(limit, page);
    const subTaskQueryBuilder = this.subTaskRepo.createQueryBuilder('subtasks');
    const subTaskQuery = subTaskQueryBuilder
      .select('*')
      .orderBy('subtasks.createdAt', 'DESC');

    if (name) {
      subTaskQuery.andWhere('subtasks.name LIKE :name', { name: `%${name}%` });
    }

    if (status) {
      const parsedStatus = JSON.parse(status);
      subTaskQuery.andWhere('subtasks.status IN (:status)', {
        status: parsedStatus,
      });
    }

    if (startDate && endDate) {
      if (!(new Date(startDate) <= new Date(endDate))) {
        throw new HttpException(
          'startDate must be less than or equal to endDate',
          HttpStatus.BAD_REQUEST,
        );
      }
      subTaskQuery.andWhere(
        'DATE(subtasks.createdAt) >= :startDate AND DATE(subtasks.createdAt) <= :endDate',
        { startDate, endDate },
      );
    }

    const listSubTask = await subTaskQuery
      .skip(offset)
      .take(limit)
      .getRawMany();
    const totalSubTask = await subTaskQuery.getCount();
    return { listSubTask, totalSubTask };
  }
}
