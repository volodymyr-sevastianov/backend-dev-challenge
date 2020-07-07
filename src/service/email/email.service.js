import { Email } from '../../model/models';
import { SMTPService } from '../smtp/smtp.service';

export class EmailService {
  constructor(model = Email, smtpService = new SMTPService()) {
    this.model = model;
    this.smtpService = smtpService;
  }

  async get(_id) {
    return this.model.findById(_id).exec();
  }

  async list(query) {
    return this.model.find(query).exec();
  }

  async listWithPatients(query) {
    return this.model.find(query).populate('patient').exec();
  }

  async create(emails) {
    return this.model.create(emails);
  }

  getDatePlusDays(daysQuantity) {
    const date = new Date();
    date.setDate(date.getDate() + daysQuantity);
    return date;
  }

  async createWithTemplate(patientId) {
    const emails = [
      { patient: patientId, name: 'Day 1', scheduledDate: this.getDatePlusDays(1) },
      { patient: patientId, name: 'Day 2', scheduledDate: this.getDatePlusDays(2) },
      { patient: patientId, name: 'Day 3', scheduledDate: this.getDatePlusDays(3) },
      { patient: patientId, name: 'Day 4', scheduledDate: this.getDatePlusDays(4) },
    ];
    return this.model.insertMany(emails);
  }

  async update(email) {
    return this.model.update({ _id: email._id }, email);
  }

  async delete(_id) {
    return this.model.findByIdAndDelete(_id).exec();
  }

  async sendMails(query) {
    await this.smtpService.configure();
    const emails = await this.listWithPatients({ ...query });

    if (emails.length === 0) {
      console.log('No emails was sent.');
      return;
    }

    return Promise.all(
      emails.map(async (email) => {
        if (!email.patient.emailAddress) {
          return;
        }
        return this.smtpService.sendMail({
          from: 'test@gmail.com',
          to: email.patient.emailAddress,
          subject: email.name,
          text: 'Patient notification',
        });
      }),
    );
  }
}
