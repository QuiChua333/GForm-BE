import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {

    }

    @Get("/register") 
    hi(){
        return '123'
    }

    @Post("/register") 
    register(){
        return this.authService.register()
    }

    //POST: .../auth/login
    @Post("login") 
    login(){

    }
}
