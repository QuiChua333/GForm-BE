import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDTO } from './DTO';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() body: RegisterUserDTO) {
    try {
      const user = await this.authService.register(body);
      return user;
    } catch (error) {
      return error;
    }
  }
}
