import { CronManager } from '../cron/cron-manager';
import { CsvToJsonService } from '../service/csv-to-json/csv-to-json.service';
import { DBService } from '../service/db/db.service';
import { PatientService } from '../service/patient/patient.service';

export class App {
  constructor(
    dbService = new DBService(),
    csvToJsonService = new CsvToJsonService(),
    patientService = new PatientService(),
    cronManager = new CronManager(),
  ) {
    this.dbService = dbService;
    this.csvToJsonService = csvToJsonService;
    this.patientService = patientService;
    this.cronManager = cronManager;
  }

  async exec() {
    await this.dbService.exec();
    try {
      const convertedFile = await this.csvToJsonService.convert();
      await this.patientService.create(convertedFile);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }

    await this.dbService.stop();

    this.cronManager.startAll();
  }
}
