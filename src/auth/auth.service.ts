import { Injectable } from '@nestjs/common';
import { RegisterUserDTO } from './DTO';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/Entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async register(registerDTO: RegisterUserDTO): Promise<User> {
    return await this.userRepository.save({
      ...registerDTO,
      isAdmin: false,
    });
  }
}
