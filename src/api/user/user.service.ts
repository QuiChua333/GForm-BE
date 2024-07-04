import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';
import {
  CreateUserDTO,
  CreateUserGoogleAccountDTO,
  CreatedUserDTO,
  UpdatedUserDTO,
} from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
  ) {}

  public async create(data: CreateUserDTO): Promise<CreatedUserDTO> {
    const { email } = data;
    const user = await this.findOneByEmail(email);

    if (user) {
      throw new ConflictException('User already exists');
    }

    const createUser = this.userRepository.create(data);
    await this.userRepository.save(createUser);

    return createUser.toResponse();
  }

  public async createWithGoogleAccount(
    data: CreateUserGoogleAccountDTO,
  ): Promise<CreatedUserDTO> {
    const { email } = data;
    const user = await this.findOneByEmail(email);

    if (user) {
      return user.toResponse();
    } else {
      const createUser = this.userRepository.create(data);
      await this.userRepository.save(createUser);

      return createUser.toResponse();
    }
  }

  async getCurrentUser(userId: string) {
    const user = await this.findOneById(userId);

    return user.toResponse();
  }
  public async updateUserById(
    userId: string,
    data: UpdateUserDTO,
  ): Promise<UpdatedUserDTO> {
    console.log(userId, data);
    await this.userRepository.update({ id: userId }, data);
    const updatedUser = await this.userRepository.findOneBy({ id: userId });

    return updatedUser.toResponse();
  }

  public async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
  public async findOneById(id: string) {
    return this.userRepository.findOneBy({ id });
  }
}
