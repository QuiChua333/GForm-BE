import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { RegisterUserDTO } from './DTO';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { sendMail } from 'src/utils/mailer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterUserDTO, @Res() res: Response) {
    try {
      const user = await this.authService.register(body);

      res.status(HttpStatus.CREATED).json({
        message: 'Sign in successfully',
        data: user,
      });
    } catch (error) {
      if (error.code === '23505') {
        res.status(HttpStatus.CONFLICT).send('Email đã tồn tại!');
        return;
      }
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        error,
      });
    }
  }
}
