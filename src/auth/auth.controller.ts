import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { RegisterUserDTO } from './DTO';
import { AuthService } from './auth.service';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { sendMail } from 'src/utils/mailer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterUserDTO, @Res() res: Response) {
    try {
      const user = await this.authService.register(body);
      const tokenVerifyEmailLink = jwt.sign(
        {
          email: user.email,
          id: user.id,
        },
        process.env.JWT_SECRET_LINK_VERIFY_EMAIL,
        {
          expiresIn: process.env.EXPIRED_LINK_VERIFY_EMAI,
        },
      );
      const url = `${process.env.FRONT_END_URL}users/verify/${tokenVerifyEmailLink}`;
      await sendMail({
        email: user.email,
        subject: 'Verify Email',
        text: url,
      });
      res.status(HttpStatus.CREATED).json({
        message: 'Sign in successfully',
        data: user,
      });
    } catch (error) {
      if (error.code === '23505') {
        res.status(HttpStatus.CONFLICT).send('Email đã tồn tại!');
        return;
      }
      res.status(HttpStatus.BAD_REQUEST).json({
        error,
      });
    }
  }
}
