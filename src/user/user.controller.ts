import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/register')
  hi() {
    return '123';
  }

  @Post('/register')
  register() {
    return this.userService.register();
  }

  //POST: .../auth/login
  @Post('login')
  login() {}
}
