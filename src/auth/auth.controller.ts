import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RegisterUserDTO, SigninUserDTO } from './DTO';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { MyJwtGuard } from './guard/myjwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async register(@Body() body: RegisterUserDTO, @Res() res: Response) {
    try {
      const tokenLinkPublic = await this.authService.signUp(body);

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
      console.log(error);
      res.status(HttpStatus.UNAUTHORIZED).json({
        message: error.message,
      });
    }
  }

  @Post('sign-in/google')
  async signinGoogle(
    @Body() body: { tokenFirebase: string },
    @Res() res: Response,
  ) {
    try {
      const data = await this.authService.signInGoogle(body.tokenFirebase);
      res.status(HttpStatus.OK).json({
        message: 'Đăng nhập thành công',
        data: data,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.UNAUTHORIZED).json({
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

  @Get('verifyLinkResetPassword/:tokenLinkResetPassword')
  async verifyLinkResetPassword(
    @Param('tokenLinkResetPassword') tokenLinkResetPassword: string,
    @Res() res: Response,
  ) {
    try {
      const email = await this.authService.verifyLinkResetPassword(
        tokenLinkResetPassword,
      );
      res.status(HttpStatus.ACCEPTED).json({
        message: 'Xác minh liên kết thành công',
        data: email,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Post('resetPassword')
  async resetPassword(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    try {
      await this.authService.resetPassword(body);
      res.status(HttpStatus.ACCEPTED).json({
        message: 'Cập nhật mật khẩu thành công',
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Post('refreshToken')
  async refreshToken(
    @Body() body: { refreshToken: string },
    @Res() res: Response,
  ) {
    try {
      const { accessToken, refreshToken } = await this.authService.refreshToken(
        body.refreshToken,
      );
      res.status(HttpStatus.ACCEPTED).json({
        message: 'Cập nhật mật khẩu thành công',
        data: { accessToken, refreshToken },
      });
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        message: error.message,
      });
    }
  }

  @UseGuards(MyJwtGuard)
  @Patch('changeUserPassword')
  async changeUserPassword(@Res() res: Response, @Req() req, @Body() body) {
    try {
      const { id: userId } = req.user;
      const user = await this.authService.changePassword(userId, body);
      res.status(HttpStatus.OK).json({
        message: 'Change password successfully',
        data: user,
      });
    } catch (error) {
      res.status(error.status).json({
        message: error.message,
      });
    }
  }

  @UseGuards(MyJwtGuard)
  @Post('password')
  async createUserPassword(@Res() res: Response, @Req() req, @Body() body) {
    try {
      const { id: userId } = req.user;
      const data = await this.authService.createUserPassword(userId, body);
      res.status(HttpStatus.OK).json({
        message: 'Set password successfully',
        data: data,
      });
    } catch (error) {
      res.status(error.status).json({
        message: error.message,
      });
    }
  }
}
