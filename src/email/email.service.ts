import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { emailVerification } from './templates';
import { MailerService } from '@nestjs-modules/mailer';
import { IEMailObject } from './email.interface';
import resetPassword from './templates/resetPassword.template';

@Injectable()
export class EmailService {
  constructor(
    private configService: ConfigService,
    private mailService: MailerService,
  ) {}

  public async sendEmailVerification({
    verifyEmailToken,
    email,
  }: {
    verifyEmailToken: string;
    email: string;
  }) {
    const url = `${this.configService.get('url.fe.baseUrl')}/${this.configService.get('url.fe.pathVerifyEmail')}/${verifyEmailToken}`;
    const emailVerificationTemplate = emailVerification(url);

    await this.sendMail({
      email,
      subject: 'XÁC MINH EMAIL',
      useHTML: true,
      html: emailVerificationTemplate,
    });
  }

  public async sendPasswordResetLink({
    resetPasswordToken,
    email,
  }: {
    resetPasswordToken: string;
    email: string;
  }) {
    const url = `${this.configService.get('url.fe.baseUrl')}/${this.configService.get('url.fe.pathResetPassword')}/${resetPasswordToken}`;
    const resetPasswordTemplate = resetPassword(url);

    await this.sendMail({
      email,
      subject: 'THAY ĐỔI MẬT KHẨU',
      useHTML: true,
      html: resetPasswordTemplate,
    });
  }

  private async sendMail(mailObject: IEMailObject) {
    const { email, subject, text, html, useHTML } = mailObject;

    if (useHTML) {
      await this.mailService.sendMail({
        to: email,
        subject: subject,
        text: text,
      });
    } else {
      await this.mailService.sendMail({
        to: email,
        subject: subject,
        html: html,
      });
    }
  }
}
