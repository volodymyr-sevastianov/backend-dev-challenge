import { SendScheduledEmailCron } from './send-scheduled-email.cron';

export class CronManager {
  constructor(cronJobs = [new SendScheduledEmailCron()]) {
    this.cronJobs = cronJobs;
  }

  startOne(name) {
    let result = true;
    const cronJob = this.findCronJob(name);
    if (!cronJob) {
      throw new Error(`Cron Job with name '${name}' hasn't been found`);
    }
    try {
      cronJob.start();
    } catch (err) {
      result = result && false;
      console.error(`Error during start cron job '${cronJob.name}'`, err);
    }

    return result;
  }

  stopOne(name) {
    let result = true;
    const cronJob = this.findCronJob(name);
    if (!cronJob) {
      throw new Error(`Cron Job with name '${name}' hasn't been found`);
    }
    try {
      cronJob.stop();
    } catch (err) {
      result = result && false;
      console.error(`Error during stop cron job '${cronJob.name}'`, err);
    }

    return result;
  }

  startAll() {
    let result = true;
    this.cronJobs.forEach((cronJob) => {
      try {
        cronJob.start();
      } catch (err) {
        result = result && false;
        console.error(`Error during start cron job '${cronJob.name}'`, err);
      }
    });

    return result;
  }

  stopAll() {
    let result = true;
    this.cronJobs.forEach((cronJob) => {
      try {
        cronJob.stop();
      } catch (err) {
        result = result && false;
        console.error(`Error during stop cron job '${cronJob.name}'`, err);
      }
    });

    return result;
  }

  findCronJob(name) {
    return this.cronJobs.find((cronJob) => cronJob.name === name);
  }
}
