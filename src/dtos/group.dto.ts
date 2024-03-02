import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddGroupDTO {
  @ApiProperty({ type: 'string', example: 'example', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'string', example: 'example', required: false })
  description: string;
}

export class EditGroupDTO {
  @ApiProperty({ type: 'string', example: 'example', required: false })
  name: string;

  @ApiProperty({ type: 'string', example: 'example', required: false })
  description: string;
}
