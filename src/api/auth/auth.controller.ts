import { Body, Param } from '@nestjs/common';
import {
  RegisterUserDTO,
  RegisteredUserDTO,
  SigninUserDTO,
  SigninedDTO,
} from './dto';
import { AuthService } from './auth.service';
import { InjectController, InjectRoute, ReqUser } from '@/decorators';
import authRoutes from './auth.routes';
import { UpdatedUserDTO } from '../user/dto';
import { ITokenAuthentication } from '../token/token.interface';

@InjectController({ name: authRoutes.index })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @InjectRoute(authRoutes.signUp)
  async register(@Body() body: RegisterUserDTO): Promise<RegisteredUserDTO> {
    const registerUser = await this.authService.signUp(body);
    return registerUser;
  }

  @InjectRoute(authRoutes.emailVerification)
  async verifyEmail(
    @Param('verifyEmailToken') verifyEmailToken: string,
  ): Promise<UpdatedUserDTO> {
    const updatedUser = await this.authService.verifyEmail(verifyEmailToken);
    return updatedUser;
  }

  @InjectRoute(authRoutes.signIn)
  async signIn(@Body() body: SigninUserDTO): Promise<SigninedDTO> {
    const signInData = await this.authService.signIn(body);
    return signInData;
  }

  @InjectRoute(authRoutes.signInGoogle)
  async signinGoogle(
    @Body() body: { tokenFirebase: string },
  ): Promise<SigninedDTO> {
    const signInData = await this.authService.signInGoogle(body.tokenFirebase);
    return signInData;
  }

  @InjectRoute(authRoutes.passwordResetLink)
  async sendPasswordResetLink(@Param('email') email: string): Promise<string> {
    await this.authService.sendPasswordResetLink(email);
    return email;
  }

  @InjectRoute(authRoutes.verifyLinkResetPassword)
  async verifyLinkResetPassword(
    @Param('resetPasswordToken') resetPasswordToken: string,
  ): Promise<string> {
    const email =
      await this.authService.verifyLinkResetPassword(resetPasswordToken);
    return email;
  }

  @InjectRoute(authRoutes.resetPassword)
  async resetPassword(
    @Param('resetPasswordToken') resetPasswordToken: string,
    @Body() body: { password: string },
  ): Promise<UpdatedUserDTO> {
    const updatedUserDTO = await this.authService.resetPassword({
      resetPasswordToken,
      password: body.password,
    });
    return updatedUserDTO;
  }

  @InjectRoute(authRoutes.refreshToken)
  async refreshToken(
    @Body() body: { refreshToken: string },
  ): Promise<ITokenAuthentication> {
    const resultTokens = await this.authService.refreshToken(body.refreshToken);
    return resultTokens;
  }

  @InjectRoute(authRoutes.changeUserPassword)
  async changeUserPassword(
    @Body() body,
    @ReqUser() user,
  ): Promise<SigninedDTO> {
    const updatedUser = await this.authService.changePassword({
      userId: user.id,
      ...body,
    });
    return updatedUser;
  }
}
