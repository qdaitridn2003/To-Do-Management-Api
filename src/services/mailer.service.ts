import { Injectable } from '@nestjs/common';
import * as Nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { emailHtml } from 'src/commons';

@Injectable({})
export class MailerService {
  private mailerTransporter: Nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  constructor() {
    this.mailerTransporter = Nodemailer.createTransport(
      {
        host: process.env.MAILER_HOST,
        secure: false,
        auth: {
          user: process.env.MAILER_USERNAME,
          pass: process.env.MAILER_PASSWORD,
        },
      },
      { from: 'No-reply <teamcook@gmail.com>' },
    );
  }

  async sendOtpToEmail(email: string, otp: string) {
    const mailerOptions: Mail.Options = {
      from: '',
      to: email,
      subject: 'Confirm Is Your Email Request',
      html: emailHtml(otp),
    };
    return this.mailerTransporter.sendMail(mailerOptions);
  }
}
