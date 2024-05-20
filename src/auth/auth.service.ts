import { Injectable } from '@nestjs/common';
import { RegisterUserDTO } from './DTO';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/Entity/user.entity';
import { Repository } from 'typeorm';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async register(registerDTO: RegisterUserDTO) {
    const hashedPassword = await argon.hash(registerDTO.password);
    const user = await this.userRepository.save({
      ...registerDTO,
      password: hashedPassword,
      isAdmin: false,
      isVerifiedEmail: false,
    });
    delete user.password;
    delete user.refreshToken;
    return user;
  }
}
