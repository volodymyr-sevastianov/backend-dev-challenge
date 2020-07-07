import nodemailer from 'nodemailer';

import { SMTPConfig } from '../../config/smtp/smtp.config';

export class SMTPService {
  constructor(smtpConfig = new SMTPConfig()) {
    this.smtpConfig = smtpConfig;
  }

  async configure() {
    if (!this.smtpConfig.auth.user) {
      const testAccount = await nodemailer.createTestAccount();
      this.smtpConfig.auth.user = testAccount.user;
      this.smtpConfig.auth.pass = testAccount.pass;
    }

    this.transport = nodemailer.createTransport(this.smtpConfig);
  }

  async sendMail(mailOptions) {
    const result = await this.transport.sendMail(mailOptions);
    console.log(result);
  }
}
