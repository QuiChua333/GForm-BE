import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { RegisterUserDTO } from './DTO';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { sendMail } from 'src/utils/mailer';
import { ConfigService } from '@nestjs/config';

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
        message: 'Verify successfully',
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }
}
