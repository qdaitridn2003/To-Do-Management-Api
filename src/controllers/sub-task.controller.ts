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

import { SubTaskService } from 'src/services';
import { AddSubTaskDTO, EditSubTaskDTO } from 'src/dtos';

@Controller('/sub-task')
@ApiTags('Sub Task')
@ApiBearerAuth()
export class SubTaskController {
  constructor(private subTaskService: SubTaskService) {}

  @Post('/create-subtask')
  createSubTask(@Body() body: AddSubTaskDTO) {
    return this.subTaskService.addSubTask(body);
  }

  @Put('/update-subtask/:id')
  updateSubTask(@Param('id') id: string, @Body() body: EditSubTaskDTO) {
    return this.subTaskService.editSubTask(id, body);
  }

  @Delete('/delete-subtask/:id')
  deleteSubTask(@Param('id') id: string) {
    return this.subTaskService.removeSubTask(id);
  }

  @Get('/get-subtask/:id')
  getDetailSubTask(@Param('id') id: string) {
    return this.subTaskService.getDetailSubTask(id);
  }

  @Get('/get-subtask')
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
    return this.subTaskService.getAllSubTask(
      limit,
      page,
      search,
      status,
      startDate,
      endDate,
    );
  }
}
