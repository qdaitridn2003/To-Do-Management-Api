import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UsernameDTO {
  @ApiProperty({
    example: 'example@mail.com',
    type: 'string',
  })
  @IsEmail()
  @IsNotEmpty()
  username: string;
}

export class LoginDTO extends UsernameDTO {
  @ApiProperty({
    example: 'example',
    type: 'string',
  })
  @IsNotEmpty()
  password: string;
}

export class PasswordDTO extends UsernameDTO {
  @ApiProperty({
    example: 'example',
    type: 'string',
  })
  @IsNotEmpty()
  @MinLength(6)
  @Matches(new RegExp('^[a-z0-9]*$'), {
    message: 'password must be not have special characters or capital letters',
  })
  password: string;

  @ApiProperty({
    example: 'example',
    type: 'string',
  })
  @IsNotEmpty()
  @MinLength(6)
  @Matches(new RegExp('^[a-z0-9]*$'), {
    message:
      'confirmPassword must be not have special characters or capital letters',
  })
  confirmPassword: string;
}

export class OtpDTO {
  @ApiProperty({
    example: '123456',
    type: 'string',
  })
  @IsNotEmpty()
  @MaxLength(6)
  otp: string;
}

export class ChangePasswordDTO {
  @ApiProperty({
    example: 'example',
    type: 'string',
  })
  oldPassword: string;

  @ApiProperty({
    example: 'example',
    type: 'string',
  })
  @IsNotEmpty()
  @MinLength(6)
  @Matches(new RegExp('^[a-z0-9]*$'), {
    message:
      'newPassword must be not have special characters or capital letters',
  })
  newPassword: string;

  @ApiProperty({
    example: 'example',
    type: 'string',
  })
  @IsNotEmpty()
  @MinLength(6)
  @Matches(new RegExp('^[a-z0-9]*$'), {
    message:
      'confirmPassword must be not have special characters or capital letters',
  })
  confirmPassword: string;
}

export class SetPasswordDTO {
  @ApiProperty({
    example: 'example',
    type: 'string',
  })
  @IsNotEmpty()
  @MinLength(6)
  @Matches(new RegExp('^[a-z0-9]*$'), {
    message: 'password must be not have special characters or capital letters',
  })
  password: string;

  @ApiProperty({
    example: 'example',
    type: 'string',
  })
  @IsNotEmpty()
  @MinLength(6)
  @Matches(new RegExp('^[a-z0-9]*$'), {
    message:
      'confirmPassword must be not have special characters or capital letters',
  })
  confirmPassword: string;
}
