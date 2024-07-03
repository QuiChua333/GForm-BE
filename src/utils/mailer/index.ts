import { MailerService } from '@nestjs-modules/mailer';

interface MailObjectInterface {
  email: string;
  subject: string;
  text: string;
  html?: string;
  mailService: MailerService;
}
const sendMail = async ({
  email,
  subject,

  text,
  html,
  mailService,
}: MailObjectInterface) => {
  try {
    if (!html) {
      await mailService.sendMail({
        from: `"GForm" <${process.env.USER_EMAIL}>`,
        to: email,
        subject: subject,
        text: text,
      });
    } else {
      await mailService.sendMail({
        from: `"GForm" <${process.env.USER_EMAIL}>`,
        to: email,
        subject: subject,
        html: html,
      });
    }
  } catch (error) {
    throw error;
  }
};
export { sendMail };
