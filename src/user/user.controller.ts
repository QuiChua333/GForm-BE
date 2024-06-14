import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { MyJwtGuard } from 'src/auth/guard/myjwt.guard';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @UseGuards(MyJwtGuard)
  @Get('getCurrentUser')
  async getCurrentUser(@Res() res: Response, @Req() req) {
    try {
      const { id } = req.user;
      const user = await this.userService.getCurrentUser(id);
      res.status(HttpStatus.OK).json({
        message: 'Get current user successfully',
        data: user,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @UseGuards(MyJwtGuard)
  @Patch('changeUserAvatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
    @Body() body,
    @Req() req,
  ) {
    try {
      const { avatar } = body;
      const { id: userId } = req.user;
      if (avatar) await this.cloudinaryService.destroyFile(avatar);
      const response = await this.cloudinaryService.uploadFile(file);
      const newUrl: string = response.secure_url;
      await this.userService.updateUser(userId, { avatar: newUrl });
      res.status(HttpStatus.OK).json({
        message: 'Chang user avatar successfully',
        data: newUrl,
      });
      return response;
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @UseGuards(MyJwtGuard)
  @Patch('changeUsername')
  async changeUsername(@Res() res: Response, @Req() req, @Body() body) {
    try {
      const { id: userId } = req.user;
      const user = await this.userService.updateUser(userId, body);
      res.status(HttpStatus.OK).json({
        message: 'Change username successfully',
        data: user,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }
}
