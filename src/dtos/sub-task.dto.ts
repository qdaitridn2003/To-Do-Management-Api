import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { PriorityEnum, StatusEnum } from 'src/commons';

export class AddSubTaskDTO {
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
  taskId: string;
}

export class EditSubTaskDTO {
  @ApiProperty({ type: 'string', example: 'example', required: false })
  name: string;

  @ApiProperty({ type: 'string', example: 'example', required: false })
  description: string;

  @ApiProperty({ type: 'enum', enum: PriorityEnum, required: false })
  @IsNotEmpty()
  priority: string;

  @ApiProperty({ type: 'string', example: '1', required: true })
  taskId: string;

  @ApiProperty({ type: 'enum', enum: StatusEnum, required: false })
  status: StatusEnum;
}
