import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AddTaskDTO, EditTaskDTO } from 'src/dtos';
import { TaskService } from 'src/services';

@Controller('/task')
@ApiTags('Task')
@ApiBearerAuth()
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('/create-task')
  createTask(@Body() body: AddTaskDTO) {
    return this.taskService.addTask(body);
  }

  @Put('/update-task/:id')
  updateTask(@Param('id') id: string, @Body() body: EditTaskDTO) {
    return this.taskService.editTask(id, body);
  }

  @Delete('/delete-task/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.removeTask(id);
  }

  @Get('/get-task/:id')
  getDetailTask(@Param('id') id: string) {
    return this.taskService.getDetailTask(id);
  }

  @Get('/get-task')
  @ApiQuery({ type: 'number', example: '10', name: 'limit', required: false })
  @ApiQuery({ type: 'number', example: '1', name: 'page', required: false })
  @ApiQuery({
    type: 'string',
    example: 'example',
    name: 'search',
    required: false,
  })
  @ApiQuery({
    type: 'string',
    example: '["Todo"]',
    name: 'status',
    required: false,
  })
  @ApiQuery({
    type: 'string',
    example: '1900-01-01',
    name: 'startDate',
    required: false,
  })
  @ApiQuery({
    type: 'string',
    example: '2024-01-01',
    name: 'endDate',
    required: false,
  })
  getListTask(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('search') search: string,
    @Query('status') status: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.taskService.getAllTask(
      limit,
      page,
      search,
      status,
      startDate,
      endDate,
    );
  }
}
