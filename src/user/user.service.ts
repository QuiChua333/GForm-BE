import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './Entity/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './DTO/update-user.dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async getCurrentUser(userId: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    const hasPassword = user.password ? true : false;
    delete user.password;
    delete user.refreshToken;
    return {
      ...user,
      hasPassword,
    };
  }
  async updateUser(userId: string, body: UpdateUserDTO) {
    await this.userRepository.update(
      {
        id: userId,
      },
      body,
    );
  }
}
