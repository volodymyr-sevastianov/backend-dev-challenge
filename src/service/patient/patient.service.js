import { CONSET_OPTIONS } from '../../const/const';
import { Patient } from '../../model/models';
import { EmailService } from '../email/email.service';

export class PatientService {
  constructor(model = Patient, emailService = new EmailService()) {
    this.model = model;
    this.emailService = emailService;
  }

  async get(_id) {
    return this.model.findById(_id);
  }

  async list(query) {
    return this.model.find(query);
  }

  async create(patients) {
    if (!Array.isArray(patients)) {
      return this.model.create(patients);
    }
    const createdPatients = await this.model.insertMany(patients);
    console.log('Patients successfully created.');

    await Promise.all(
      createdPatients.map(async (patient) => {
        if (patient.consent !== CONSET_OPTIONS.YES) {
          return;
        }
        return this.emailService.createWithTemplate(patient._id);
      }),
    );
    console.log('Emails successfully scheduled.');

    return createdPatients;
  }

  async update(patient) {
    return this.model.update({ _id: patient._id }, patient);
  }

  async delete(_id) {
    return this.model.findByIdAndDelete(_id);
  }
}
