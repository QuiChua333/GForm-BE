import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    register() {
        console.log(process.env.DATABASE_URL)
        return {
        
            message: 'Register a user'
        }
    }

    login() {
        return {
            message: 'login successfully'
        }
    }
}
