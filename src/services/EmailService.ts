import { EMAIL_DOMAIN } from "./../const.js";
import { Resend } from "resend";

type InputEmailService = {
  to: string | string[];
  htmlMessage: string;
  subject: string;
};
class EmailService {
  // Send a email to an specic user

  static async sendEmail({ to, htmlMessage, subject }: InputEmailService) {
    const resend = new Resend(process.env.RESEND_KEY);

    const data = await resend.emails.send({
      from: EMAIL_DOMAIN,
      to,
      subject,
      html: htmlMessage,
    });
    if (data.error) {
      throw new Error(data.error.message);
    }
    console.log("Email send correctlty");

    return data.data?.id;
  }
}

export default EmailService;
