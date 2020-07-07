import { Email } from '../../model/models';
import mongoose from 'mongoose';

export class EmailService {
  constructor(model = Email) {
    this.model = model;
  }
  async get(_id) {
    return this.model.findById(_id);
  }

  async list(query) {
    return this.model.find(query);
  }

  async create(emails) {
    return this.model.create(emails);
  }

  getDatePlusDays(daysQuantity) {
    const date = new Date();
    date.setDate(date.getDate() + daysQuantity);
    return date;
  }

  async createWithTemplate(patient_id, options = {}) {
    const emails = [
      { patient_id, name: 'Day 1', scheduledDate: this.getDatePlusDays(1) },
      { patient_id, name: 'Day 2', scheduledDate: this.getDatePlusDays(2) },
      { patient_id, name: 'Day 3', scheduledDate: this.getDatePlusDays(3) },
      { patient_id, name: 'Day 4', scheduledDate: this.getDatePlusDays(4) },
    ];
    return this.model.insertMany(emails);
  }

  async update(email) {
    return this.model.update({ _id: email._id }, email);
  }

  async delete(_id) {
    return this.model.findByIdAndDelete(_id);
  }
}
