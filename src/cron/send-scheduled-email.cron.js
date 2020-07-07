import { CronJob } from 'cron';
import { toString as cronTimeToString } from 'cronstrue';

import { DBService } from '../service/db/db.service';
import { EmailService } from '../service/email/email.service';

export class SendScheduledEmailCron {
  constructor(
    name = 'SendScheduledEmailCron',
    cronTime = '0 0 14 * * *',
    emailService = new EmailService(),
    dbService = new DBService(),
  ) {
    this.name = name;
    this.cronTime = cronTime;
    this.emailService = emailService;
    this.job = new CronJob(cronTime, this.onTick.bind(this));
    this.dbService = dbService;
  }

  async onTick() {
    await this.dbService.exec();
    const from = new Date();
    const to = new Date();
    from.setUTCHours(0, 0, 0, 0);
    to.setUTCHours(23, 59, 59, 999);
    await this.emailService.sendMails({
      scheduledDate: {
        $gte: from,
        $lt: to,
      },
    });
    await this.dbService.stop();
  }

  start() {
    this.job.start();
    console.log(`Start Cron Job '${this.name}' with cron schedule: '${cronTimeToString(this.cronTime)}'`);
  }

  stop() {
    this.job.stop();
    console.log(`Stop Cron Job '${this.name}'`);
  }
}
