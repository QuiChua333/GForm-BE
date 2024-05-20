import { ForbiddenException, Injectable } from '@nestjs/common';
import { RegisterUserDTO, SigninUserDTO } from './DTO';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/Entity/user.entity';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
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
  async signIn(authDTO: SigninUserDTO) {
    const user = await this.userRepository.findOne({
      where: {
        email: authDTO.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Tài khoản không tồn tại');
    }
    const passwordMatched = await argon.verify(user.password, authDTO.password);
    if (!passwordMatched) {
      throw new ForbiddenException('Sai mật khẩu');
    }
    const payload = { id: user.id, email: user.email };
    const { accessToken, refreshToken } = await this.generateToken(payload);
    delete user.password;
    delete user.refreshToken;
    return {
      ...user,
      accessToken,
      refreshToken,
    };
  }
  private async generateToken(payload: { id: string; email: string }) {
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_TOKEN,
      expiresIn: process.env.EXPIRED_JWT_REFRESH_TOKEN,
    });
    await this.userRepository.update(
      {
        email: payload.email,
      },
      {
        refreshToken: refreshToken,
      },
    );
    return { accessToken, refreshToken };
  }
}
