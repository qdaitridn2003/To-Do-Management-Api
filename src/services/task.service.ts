import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GroupEntity, TaskEntity } from 'src/entities';
import { TaskParams } from 'src/types';
import { paginationHelper } from 'src/utils';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity) private taskRepo: Repository<TaskEntity>,
    @InjectRepository(GroupEntity) private groupRepo: Repository<GroupEntity>,
  ) {}

  async addTask(params: TaskParams) {
    const createdTask = await this.taskRepo.create({
      name: params.name,
      description: params.description,
      priority: params.priority,
      group: { id: params.groupId },
    });
    await this.taskRepo.save(createdTask);
    return { message: 'Create task successfully' };
  }

  async editTask(taskId: string, params: TaskParams) {
    const foundTask = await this.taskRepo.findOneBy({ id: taskId });
    const foundGroup = await this.groupRepo.findOneBy({ id: params.groupId });
    if (!foundTask) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    foundTask.name = params.name;
    foundTask.description = params.description;
    foundTask.group = foundGroup;
    foundTask.priority = params.priority;
    foundTask.status = params.status;

    await this.taskRepo.save(foundTask);

    return { message: 'Update task successfully' };
  }

  async removeTask(taskId: string) {
    const foundTask = await this.taskRepo.findOneBy({ id: taskId });
    if (!foundTask) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    await this.taskRepo.remove(foundTask);
    return { message: 'Delete task successfully' };
  }

  async getDetailTask(taskId: string) {
    const foundTask = await this.taskRepo.findOne({
      where: { id: taskId },
      relations: ['subtasks', 'group'],
    });
    if (!foundTask) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return { task: foundTask };
  }

  async getAllTask(
    limit: number = 10,
    page: number = 1,
    name?: string,
    status?: string,
    startDate?: string,
    endDate?: string,
  ) {
    const offset = paginationHelper(limit, page);
    const taskQueryBuilder = this.taskRepo.createQueryBuilder('tasks');
    const taskQuery = taskQueryBuilder
      .select('*')
      .orderBy('tasks.createdAt', 'DESC');

    if (name) {
      taskQuery.andWhere('tasks.name LIKE :name', { name: `%${name}%` });
    }

    if (status) {
      const parsedStatus = JSON.parse(status);
      taskQuery.andWhere('tasks.status IN (:status)', {
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
      taskQuery.andWhere(
        'DATE(tasks.createdAt) >= :startDate AND DATE(tasks.createdAt) <= :endDate',
        { startDate, endDate },
      );
    }

    const listTask = await taskQuery.skip(offset).take(limit).getRawMany();
    const totalTask = await taskQuery.getCount();
    return { listTask, totalTask };
  }
}
