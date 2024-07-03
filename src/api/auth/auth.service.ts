import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ChangePasswordDTO,
  RegisterUserDTO,
  RegisteredUserDTO,
  ResetPasswordDTO,
  SigninUserDTO,
  SigninedDTO,
} from './dto';
import { CreatedUserDTO, UpdatedUserDTO } from '../user/dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from 'src/firebase/firebase.service';

import { type User as UserType, User } from '@/api/user/entities';

import {
  ITokenPayload,
  IValidateJwtUserParams,
  IValidateUserParams,
} from './auth.interface';
import { bcryptPassword } from '@/utils/helpers';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import { EmailService } from '@/email/email.service';
import { ITokenAuthentication } from '../token/token.interface';

export type TUser = UserType;

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,

    private userService: UserService,
    private tokenService: TokenService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private firebaseService: FirebaseService,
  ) {}

  async signUp(userInfo: RegisterUserDTO): Promise<RegisteredUserDTO> {
    const { email } = userInfo;
    const user = await this.userService.findOneByEmail(email);

    if (user) {
      throw new ConflictException('User already exists');
    }

    const registerUser = await this.userService.create(userInfo);

    const payload: ITokenPayload = {
      email: registerUser.email,
      id: user.id,
    };
    const verifyEmailToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('token.verifyEmail.lifetime') / 1000,
    });
    await this.tokenService.create({
      userId: registerUser.id,
      verifyEmailToken,
    });

    this.emailService.sendEmailVerification({
      verifyEmailToken,
      email: registerUser.email,
    });

    return registerUser;
  }

  async verifyEmail(verifyEmailToken: string): Promise<UpdatedUserDTO> {
    const payload = await this.jwtService.verifyAsync(verifyEmailToken);

    const token = await this.tokenService.findOneBy({
      user: {
        id: payload.id,
      },
    });

    if (!token.verifyEmailToken) {
      throw new NotFoundException('Url not found');
    }

    const updatedUser = await this.userService.updateUserById(payload.id, {
      isVerifiedEmail: true,
    });

    await this.tokenService.updateByUserId(payload.id, {
      verifyEmailToken: '',
    });

    return updatedUser;
  }

  async signIn(signInDTO: SigninUserDTO): Promise<SigninedDTO> {
    const user = await this.userService.findOneByEmail(signInDTO.email);
    if (!user) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    const isMatchedPassword = await bcryptPassword.verifyWithBcrypt({
      plainTextPassword: signInDTO.password,
      hashedPassword: user.password,
    });

    if (!isMatchedPassword) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    const payload: ITokenPayload = {
      email: user.email,
      id: user.id,
    };
    const resultTokens = await this.generateToken(payload);

    await this.tokenService.updateByUserId(user.id, resultTokens);

    return {
      ...resultTokens,
      userInfo: user.toResponse(),
    };
  }

  async signInGoogle(tokenFirebase: string): Promise<SigninedDTO> {
    const decodedToken =
      await this.firebaseService.verifyIdToken(tokenFirebase);
    const { name, email } = decodedToken;
    const user = await this.userService.findOneByEmail(email);

    let responsedUser: CreatedUserDTO;

    if (!user) {
      responsedUser = await this.userService.createWithGoogleAccount({
        email,
        fullName: name,
        isVerifiedEmail: true,
        isGoogleAccount: true,
      });
    } else {
      responsedUser = user.toResponse();
    }
    const payload: ITokenPayload = {
      email: responsedUser.email,
      id: responsedUser.id,
    };

    const resultTokens = await this.generateToken(payload);

    await this.tokenService.updateByUserId(responsedUser.id, resultTokens);

    return {
      ...resultTokens,
      userInfo: responsedUser,
    };
  }

  async sendPasswordResetLink(email: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) throw new NotFoundException('User not found');

    const payload: ITokenPayload = {
      email: user.email,
      id: user.id,
    };

    const resetPasswordToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('token.resetPassword.lifetime') / 1000,
    });

    await this.tokenService.updateByUserId(user.id, { resetPasswordToken });

    this.emailService.sendPasswordResetLink({
      resetPasswordToken,
      email: user.email,
    });
  }

  async verifyLinkResetPassword(
    tokenLinkResetPassword: string,
  ): Promise<string> {
    const payload: ITokenPayload = await this.jwtService.verifyAsync(
      tokenLinkResetPassword,
    );
    const user = await this.userService.findOneByEmail(payload.email);

    if (!user) throw new NotFoundException('User not found');

    const token = await this.tokenService.findOneBy({
      user: {
        id: user.id,
      },
    });
    if (!token.resetPasswordToken) {
      throw new NotFoundException('Url not found');
    }
    return user.email;
  }

  async resetPassword(
    resetPasswordData: ResetPasswordDTO,
  ): Promise<UpdatedUserDTO> {
    const user = await this.userService.findOneByEmail(resetPasswordData.email);
    if (!user) throw new NotFoundException('User not found');
    const updatedUser = await this.userService.updateUserById(user.id, {
      password: resetPasswordData.password,
    });

    const payload: ITokenPayload = {
      email: user.email,
      id: user.id,
    };
    const resultTokens = await this.generateToken(payload);

    await this.tokenService.updateByUserId(updatedUser.id, {
      ...resultTokens,
      resetPasswordToken: '',
    });

    return updatedUser;
  }

  async changePassword(
    changePasswordData: ChangePasswordDTO,
  ): Promise<SigninedDTO> {
    const user = await this.userService.findOneById(changePasswordData.userId);

    if (!user) throw new NotFoundException('User not found');

    if (changePasswordData.currentPassword !== changePasswordData.newPassword)
      throw new BadRequestException('Passwords do not match');

    const isMatchedPassword = await bcryptPassword.verifyWithBcrypt({
      plainTextPassword: changePasswordData.currentPassword,
      hashedPassword: user.password,
    });
    if (!isMatchedPassword) {
      throw new BadRequestException('Current password is incorrect');
    }

    const updatedUser = await this.userService.updateUserById(user.id, {
      password: changePasswordData.newPassword,
      isGoogleAccount: false,
    });

    const payload: ITokenPayload = {
      email: user.email,
      id: user.id,
    };

    const resultTokens = await this.generateToken(payload);

    await this.tokenService.updateByUserId(updatedUser.id, {
      refreshToken: resultTokens.refreshToken,
    });

    return {
      ...resultTokens,
      userInfo: updatedUser,
    };
  }

  async refreshToken(refreshToken: string): Promise<ITokenAuthentication> {
    const payload: ITokenPayload = await this.jwtService.verifyAsync(
      refreshToken,
      {
        secret: this.configService.get('JWT_SECRET_REFRESH_TOKEN'),
      },
    );

    const user = await this.userService.findOneByEmail(payload.email);

    const token = await this.tokenService.findOneBy({
      refreshToken,
    });

    if (!token) {
      throw new UnauthorizedException('Refresh token is invalid');
    }

    const reslutTokens = await this.generateToken(payload);

    await this.tokenService.updateByUserId(user.id, reslutTokens);
    return reslutTokens;
  }

  async generateToken(payload: ITokenPayload) {
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.refreshSecret'),
      expiresIn:
        (this.configService.get('token.authentication.lifetime') / 1000) *
        this.configService.get('token.authentication.renewedTimes'),
    });

    return { accessToken, refreshToken };
  }

  public async validateUser({
    email,
    password,
  }: IValidateUserParams): Promise<TUser> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) throw new NotFoundException('User not found');

    const isMatched = await bcryptPassword.verifyWithBcrypt({
      plainTextPassword: password,
      hashedPassword: user.password,
    });

    if (!isMatched)
      throw new UnauthorizedException('Incorrect username or password');

    return user;
  }

  public async validateJwtUser({
    email,
  }: IValidateJwtUserParams): Promise<TUser> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
