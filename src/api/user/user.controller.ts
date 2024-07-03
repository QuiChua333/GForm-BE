import {
  Body,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRoute, ReqUser } from '@/decorators';
import userRoutes from './user.routes';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @InjectRoute(userRoutes.getCurrentUser)
  async getCurrentUser(@ReqUser() reqUser) {
    const { id } = reqUser;
    const user = await this.userService.getCurrentUser(id);
    return user;
  }

  @InjectRoute(userRoutes.changeUserAvatar)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
    @ReqUser() reqUser,
  ) {
    const { avatar } = body;
    const { id: userId } = reqUser;
    if (avatar) await this.cloudinaryService.destroyFile(avatar);
    const response = await this.cloudinaryService.uploadFile(file);
    const newUrl: string = response.secure_url;
    const updatedUser = await this.userService.updateUserById(userId, {
      avatar: newUrl,
    });
    return updatedUser;
  }

  @InjectRoute(userRoutes.changeUserName)
  async changeUsername(@Body() body, @ReqUser() reqUser) {
    const { id: userId } = reqUser;
    const updatedUser = await this.userService.updateUserById(userId, body);
    return updatedUser;
  }
}
