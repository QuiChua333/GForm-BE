import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { emailVerification } from './templates';
import { MailerService } from '@nestjs-modules/mailer';
import { IEMailObject } from './email.interface';
import resetPassword from './templates/resetPassword.template';
import shareSurvey from './templates/shareSurvey.template';

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

  public async sendMailShareSurvey({
    surveyTitle,
    ownerName,
    email,
    subject,
    message,
    linkEditSurvey,
  }: {
    surveyTitle: string;
    ownerName: string;
    email: string;
    subject: string;
    message: string;
    linkEditSurvey: string;
  }) {
    const shareSurveyTemplate = shareSurvey({
      surveyTitle,
      message,
      linkEditSurvey,
      ownerName,
    });

    await this.sendMail({
      email,
      subject: subject,
      useHTML: true,
      html: shareSurveyTemplate,
    });
  }

  private async sendMail(mailObject: IEMailObject) {
    const { email, subject, text, html, useHTML } = mailObject;

    if (useHTML) {
      await this.mailService.sendMail({
        from: `"GForm" <${process.env.MAIL_USERNAME}>`,
        to: email,
        subject: subject,
        html: html,
      });
    } else {
      await this.mailService.sendMail({
        from: `"GForm" <${process.env.MAIL_USERNAME}>`,
        to: email,
        subject: subject,
        text: text,
      });
    }
  }
}
