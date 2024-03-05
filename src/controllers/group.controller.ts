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
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { GroupService } from '../services';
import { AddGroupDTO, EditGroupDTO } from '../dtos';
import { Request } from 'express';
import { JwtPayload } from '../types';

@Controller('/api/group')
@ApiTags('Group')
@ApiBearerAuth()
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post('/create-group')
  createGroup(@Req() req: Request, @Body() body: AddGroupDTO) {
    const { profileId } = req['auth'] as JwtPayload;
    return this.groupService.addGroup(profileId, body);
  }

  @Put('/update-group/:id')
  updateGroup(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: EditGroupDTO,
  ) {
    const { profileId } = req['auth'] as JwtPayload;
    return this.groupService.editGroup(profileId, id, body);
  }

  @Delete('/delete-group/:id')
  deleteGroup(@Param('id') id: string) {
    return this.groupService.removeGroup(id);
  }

  @Get('/get-group/:id')
  getDetailGroup(@Param('id') id: string) {
    return this.groupService.getDetailGroup(id);
  }

  @Get('/get-group')
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
  getListGroup(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('search') search: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.groupService.getAllGroup(
      limit,
      page,
      search,
      startDate,
      endDate,
    );
  }

  @Put('/join-group/:id')
  joinGroup(@Req() req: Request, @Query('id') id: string) {
    const { profileId } = req['auth'] as JwtPayload;
    return this.groupService.workingWithGroup(id, profileId, 'join');
  }

  @Put('/leave-group/:id')
  leaveGroup(@Req() req: Request, @Query('id') id: string) {
    const { profileId } = req['auth'] as JwtPayload;
    return this.groupService.workingWithGroup(id, profileId, 'leave');
  }
}
