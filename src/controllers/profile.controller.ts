import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { ProfileService } from '../services';
import { AddProfileDTO, AvatarDTO, EditProfileDTO } from '../dtos';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { JwtPayload } from '../types';

@Controller('/api/profile')
@ApiTags('Profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post('/create-profile')
  createProfile(@Body() body: AddProfileDTO) {
    return this.profileService.addProfile(body);
  }

  @Post('/upload-avatar')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: AvatarDTO })
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    const imageURL = await this.profileService.uploadAvatar(file);
    return { image: imageURL };
  }

  @Put('/update-profile')
  @ApiBearerAuth()
  updateProfile(@Req() req: Request, @Body() body: EditProfileDTO) {
    const { profileId } = req['auth'] as JwtPayload;
    return this.profileService.editProfile(profileId, body);
  }

  @Get('/me')
  @ApiBearerAuth()
  getProfile(@Req() req: Request) {
    const { profileId } = req['auth'] as JwtPayload;
    return this.profileService.getProfile(profileId);
  }

  @Get('/:id')
  @ApiBearerAuth()
  getProfileById(@Param('id') id: string) {
    return this.profileService.getProfile(id);
  }
}
