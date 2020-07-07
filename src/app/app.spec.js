import { CONSET_OPTIONS } from '../const/const';
import { Email, Patient } from '../model/models';
import { CsvToJsonService } from '../service/csv-to-json/csv-to-json.service';
import { DBService } from '../service/db/db.service';

const { SOURCE_FILE_PATH } = process.env;

describe('app', () => {
  const dbService = new DBService();
  const csvToJSONService = new CsvToJsonService();

  beforeAll(async () => {
    await dbService.exec();
  });

  afterAll(async () => {
    await dbService.stop();
  });

  it('data in flat file matches the data in Patients collection', async () => {
    const patientsFromDB = (await Patient.find().exec()).map((patient) => {
      const newPatient = JSON.parse(JSON.stringify(patient));
      delete newPatient._id;
      return newPatient;
    });
    const patientsFromCSV = (await csvToJSONService.convert(SOURCE_FILE_PATH)).map((patient) => {
      const newPatient = JSON.parse(JSON.stringify(new Patient(patient)));
      delete newPatient._id;
      return newPatient;
    });
    expect(patientsFromDB).toMatchObject(patientsFromCSV);
  });

  it('Verify Emails were created in Emails Collection for patients who have CONSENT as Y', async () => {
    const patientIdsArray = (
      await Patient.aggregate()
        .match({ consent: CONSET_OPTIONS.YES })
        .sort({
          _id: 1,
        })
        .exec()
    ).map((item) => {
      return JSON.parse(JSON.stringify(item))._id;
    });
    const patientIdsArrayFromEmails = (
      await Email.aggregate()
        .group({
          _id: '$patient',
        })
        .sort({
          _id: 1,
        })
        .exec()
    ).map((item) => {
      return JSON.parse(JSON.stringify(item))._id;
    });
    expect(patientIdsArray).not.toEqual([]);
    expect(patientIdsArray).not.toEqual(undefined);
    expect(patientIdsArray).not.toEqual(null);
    expect(patientIdsArrayFromEmails).toMatchObject(patientIdsArray);
  });

  describe('Verify emails for each patient are scheduled correctly.', () => {
    let patientsEmails;
    beforeEach(async () => {
      patientsEmails = (
        await Email.aggregate()
          .sort({ scheduledDate: 1 })
          .group({
            _id: '$patient',
            emails: { $push: { _id: '$_id', scheduledDate: '$scheduledDate' } },
          })
          .exec()
      ).map((patient) => {
        return JSON.parse(JSON.stringify(patient));
      });
    });

    it('each patient has four scheduled emails', async () => {
      patientsEmails.forEach((patientEmails) => {
        expect(patientEmails.emails.length).toEqual(4);
      });
      expect(patientsEmails).not.toEqual([]);
      expect(patientsEmails).not.toEqual(undefined);
      expect(patientsEmails).not.toEqual(null);
    });

    it('each email has scheduledDate created by rule "currentDate + i (days); i >= 1 and i <= 4"', async () => {
      patientsEmails.forEach((patientEmails) => {
        patientEmails.emails.forEach((email, index) => {
          const scheduledDate = new Date(email.scheduledDate);

          const minTomorrowsDate = new Date();
          minTomorrowsDate.setDate(minTomorrowsDate.getDate() + index + 1);
          minTomorrowsDate.setUTCHours(0, 0, 0, 0);

          const maxTomorrowsDate = new Date();
          maxTomorrowsDate.setDate(maxTomorrowsDate.getDate() + index + 1);
          maxTomorrowsDate.setUTCHours(23, 59, 59, 999);
          expect(scheduledDate >= minTomorrowsDate && scheduledDate <= maxTomorrowsDate).toBe(true);
        });
      });
      expect(patientsEmails).not.toEqual([]);
      expect(patientsEmails).not.toEqual(undefined);
      expect(patientsEmails).not.toEqual(null);
    });
  });

  it('Print out all Patient IDs where the first name is missing', async () => {
    const data = await Patient.find({ $or: [{ firstName: null }, { firstName: '' }] }).exec();
    console.log('Print out all Patient IDs where the first name is missing:', data);
  });

  it('Print out all Patient IDs where the email address is missing, but consent is Y', async () => {
    const data = await Patient.find({
      $or: [{ emailAddress: null }, { emailAddress: '' }],
      consent: CONSET_OPTIONS.YES,
    }).exec();
    console.log('Print out all Patient IDs where the email address is missing, but consent is Y', data);
  });
});
