const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASSWORD, SMTP_SERVICE } = process.env;

export class SMTPConfig {
  host = SMTP_HOST;

  port = SMTP_PORT;

  secure = SMTP_SECURE;

  service = SMTP_SERVICE;

  auth = {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  };
}
