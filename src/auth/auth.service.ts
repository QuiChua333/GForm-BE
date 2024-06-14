import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDTO, SigninUserDTO } from './DTO';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/Entity/user.entity';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { sendMail } from 'src/utils/mailer';
import { MailerService } from '@nestjs-modules/mailer';
import emailVerification from 'src/utils/mailer/html_templates/emailVerification';
import { ConfigService } from '@nestjs/config';
import resetPassword from 'src/utils/mailer/html_templates/resetPassword';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly mailService: MailerService,

    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(registerDTO: RegisterUserDTO) {
    const hashedPassword = await argon.hash(registerDTO.password);
    const user = await this.userRepository.save({
      ...registerDTO,
      password: hashedPassword,
      isAdmin: false,
      isVerifiedEmail: false,
    });
    delete user.password;
    delete user.refreshToken;
    // Gửi liên kết xác thực email
    const tokenLink = await this.jwtService.signAsync(
      {
        email: user.email,
        id: user.id,
      },
      {
        secret: this.configService.get('JWT_SECRET_VERIFY_EMAIL'),
        expiresIn: this.configService.get('EXPIRED_JWT_LINK_EMAIL'),
      },
    );

    const link = `${this.configService.get('FE_URL')}/email-verification-result/${tokenLink}`;
    console.log(link);
    const templateHTMLEmail = emailVerification(link);
    sendMail({
      email: user.email,
      subject: 'Xác minh email',
      html: templateHTMLEmail,
      mailService: this.mailService,
    });
  }

  async verifyEmail(tokenLink: string) {
    const payload = await this.jwtService.verifyAsync(tokenLink, {
      secret: this.configService.get('JWT_SECRET_VERIFY_EMAIL'),
    });
    const user = await this.userRepository.findOne({
      where: {
        id: payload.id,
      },
    });
    user.isVerifiedEmail = true;
    await this.userRepository.save(user);
  }

  async signIn(authDTO: SigninUserDTO) {
    const user = await this.userRepository.findOne({
      where: {
        email: authDTO.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }

    const passwordMatched = await argon.verify(user.password, authDTO.password);
    if (!passwordMatched) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }
    const payload = { id: user.id, email: user.email };
    const { accessToken, refreshToken } = await this.generateToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }
  async checkExistEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!user) throw new Error('Email không tồn tại');
    const tokenLinkResetPassword = await this.jwtService.signAsync(
      {
        email: user.email,
        id: user.id,
      },
      {
        secret: this.configService.get('JWT_SECRET_VERIFY_EMAIL'),
        expiresIn: this.configService.get('EXPIRED_JWT_LINK_EMAIL'),
      },
    );

    const link = `${this.configService.get('FE_URL')}/reset-password/${tokenLinkResetPassword}`;
    const templateHTMLResetPassword = resetPassword(link);
    sendMail({
      email: user.email,
      subject: 'Thay đổi mật khẩu',
      html: templateHTMLResetPassword,
      mailService: this.mailService,
    });
  }
  async verifyLinkResetPassword(tokenLinkResetPassword: string) {
    const payload = await this.jwtService.verifyAsync(tokenLinkResetPassword, {
      secret: this.configService.get('JWT_SECRET_VERIFY_EMAIL'),
    });
    const user = await this.userRepository.findOne({
      where: {
        email: payload.email,
      },
    });
    if (!user) throw new Error('Email không tồn tại');
    return user.email;
  }

  async resetPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    const hashedPassword = await argon.hash(password);
    user.password = hashedPassword;
    await this.userRepository.save(user);
  }
  async changePassword(
    userId: string,
    body: { newPassword: string; currentPassword: string },
  ) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    const passwordMatched = await argon.verify(
      user.password,
      body.currentPassword,
    );
    if (!passwordMatched) {
      throw new BadRequestException('Sai mật khẩu');
    }
    const hashedPassword = await argon.hash(body.newPassword);
    const payload = { id: user.id, email: user.email };
    const { accessToken, refreshToken } = await this.generateToken(payload);

    user.password = hashedPassword;
    user.refreshToken = refreshToken;
    await this.userRepository.save(user);

    return {
      accessToken,
      refreshToken,
    };
  }
  async refreshToken(refreshToken: string) {
    const verify = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get('JWT_SECRET_REFRESH_TOKEN'),
    });
    const checkExistToken = await this.userRepository.findOne({
      where: {
        refreshToken: refreshToken,
        email: verify.email,
      },
    });
    if (checkExistToken) {
      return this.generateToken({ id: verify.id, email: verify.email });
    } else throw new UnauthorizedException('Refresh token is invalid');
  }

  async generateToken(payload: { id: string; email: string }) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET_ACCESS_TOKEN'),
      expiresIn: this.configService.get('EXPIRED_JWT_ACCESS_TOKEN'),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET_REFRESH_TOKEN'),
      expiresIn: this.configService.get('EXPIRED_JWT_REFRESH_TOKEN'),
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
