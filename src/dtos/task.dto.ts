import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PriorityEnum, StatusEnum } from '../commons';

export class AddTaskDTO {
  @ApiProperty({ type: 'string', example: 'example', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'string', example: 'example', required: false })
  description: string;

  @ApiProperty({ type: 'enum', enum: PriorityEnum, required: true })
  @IsNotEmpty()
  priority: string;

  @ApiProperty({ type: 'string', example: '1', required: true })
  groupId: string;
}

export class EditTaskDTO {
  @ApiProperty({ type: 'string', example: 'example', required: false })
  name: string;

  @ApiProperty({ type: 'string', example: 'example', required: false })
  description: string;

  @ApiProperty({ type: 'enum', enum: PriorityEnum, required: false })
  @IsNotEmpty()
  priority: string;

  @ApiProperty({ type: 'string', example: '1', required: true })
  groupId: string;

  @ApiProperty({ type: 'enum', enum: StatusEnum, required: false })
  status: StatusEnum;
}
