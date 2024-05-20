import nodemailer from 'nodemailer';
interface MailObjectInterface {
  email: string;
  subject: string;
  text?: string;
  html?: string;
}
const sendMail = async ({
  email,
  subject,
  text,
  html,
}: MailObjectInterface) => {
  try {
    const transporter = nodemailer.createTransport({
      secure: false,
      host: 'smtp@gmail.com',
      port: 587,
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

    if (!html) {
      await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: email,
        subject: subject,
        text: text,
      });
    } else {
      await transporter.sendMail({
        from: `"GForm" <${process.env.USER_EMAIL}>`,
        to: email,
        subject: subject,
        html: html,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
export { sendMail };
