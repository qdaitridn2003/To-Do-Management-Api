import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { GenderEnum } from 'src/commons';

export class AddProfileDTO {
  @ApiProperty({ example: '1', type: 'string' })
  @IsNotEmpty()
  authId: string;

  @ApiProperty({ example: 'example', type: 'string' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'example', type: 'string' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'example', type: 'string', nullable: true })
  subName: string;

  @ApiProperty({ example: '2003-11-11', type: 'string' })
  @IsDateString()
  birthday: Date;

  @ApiProperty({ example: 'Male', type: 'enum', enum: GenderEnum })
  @IsEnum(GenderEnum)
  gender: string;

  @ApiProperty({
    example: 'https://example/image.png',
    type: 'string',
    required: false,
  })
  @IsString()
  avatar: string;
}

export class AvatarDTO {
  @ApiProperty({ type: 'file' })
  @IsNotEmpty()
  avatar: any;
}

export class EditProfileDTO {
  @ApiProperty({ example: 'example', type: 'string', required: false })
  firstName: string;

  @ApiProperty({ example: 'example', type: 'string', required: false })
  lastName: string;

  @ApiProperty({ example: 'example', type: 'string', required: false })
  subName: string;

  @ApiProperty({ example: '2003-11-11', type: 'string', required: false })
  @IsDateString()
  birthday: Date;

  @ApiProperty({
    example: 'Male',
    type: 'enum',
    enum: GenderEnum,
    required: false,
  })
  @IsEnum(GenderEnum)
  gender: string;

  @ApiProperty({
    example: 'https://example/image.png',
    type: 'string',
    required: false,
  })
  @IsString()
  avatar: string;
}
