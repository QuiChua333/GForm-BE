import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { RegisterUserDTO, SigninUserDTO } from './DTO';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterUserDTO, @Res() res: Response) {
    try {
      const tokenLinkPublic = await this.authService.register(body);

      res.status(HttpStatus.CREATED).json({
        message: 'Đăng ký tài khoản thành công',
        data: tokenLinkPublic,
      });
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        res.status(HttpStatus.CONFLICT).json({
          message: 'Email đã tồn tại',
        });
        return;
      }
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Get('verifyEmailPublicLink/:tokenLinkPublic')
  async verifyEmailPublicLink(
    @Param('tokenLinkPublic') tokenLinkPublic: string,
    @Res() res: Response,
  ) {
    try {
      await this.authService.verifyEmail(tokenLinkPublic);
      res.status(HttpStatus.ACCEPTED).json({
        message: 'Liên kết còn thời hạn',
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }
  @Get('verifyEmail/:tokenLink')
  async verifyEmail(
    @Param('tokenLink') tokenLink: string,
    @Res() res: Response,
  ) {
    try {
      await this.authService.verifyEmail(tokenLink);
      res.status(HttpStatus.ACCEPTED).json({
        message: 'Xác minh email thành công',
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Post('signin')
  async signIn(@Body() body: SigninUserDTO, @Res() res: Response) {
    try {
      const user = await this.authService.signIn(body);
      res.status(HttpStatus.OK).json({
        message: 'Đăng nhập thành công',
        data: user,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Get('checkExistEmail/:email')
  async checkExistEmail(@Param('email') email: string, @Res() res: Response) {
    try {
      await this.authService.checkExistEmail(email);
      res.status(HttpStatus.ACCEPTED).json({
        message: 'Có tồn tại email',
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }
}
