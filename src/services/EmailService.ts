import nodemailer, { Transporter, SendMailOptions } from "nodemailer";

export class EmailService {
  static transporter: Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "upr.tesislab@gmail.com",
      pass: "ngrb tvvb aemw yivx",
    },
  });

  // Send an email to a specific user
  static async sendEmail(options: SendMailOptions) {
    const emailOptions: SendMailOptions = {
      ...options,
      from: "upr.tesislab@gmail.com",
    };

    // Convert to option to a string if it's an array
    if (Array.isArray(options.to)) {
      emailOptions.to = options.to.join(" ");
    }

    try {
      const info = await EmailService.transporter.sendMail(emailOptions);
      return info;
    } catch (error) {
      console.error(error);
      throw new Error((error as Error).message);
    }
  }
}
