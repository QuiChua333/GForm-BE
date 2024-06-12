import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { MyJwtGuard } from 'src/auth/guard/myjwt.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

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
}
