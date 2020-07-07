import { DbService } from '../service/db/db.service';
import { CsvToJsonService } from '../service/csv-to-json/csv-to-json.service';
import { PatientService } from '../service/patient/patient.service';

export class App {
  constructor(
    dbService = new DbService(),
    csvToJsonService = new CsvToJsonService(),
    patientService = new PatientService(),
  ) {
    this.dbService = dbService;
    this.csvToJsonService = csvToJsonService;
    this.patientService = patientService;
  }
  async exec() {
    await this.dbService.exec();
    let convertedFile = await this.csvToJsonService.convert();
    await this.patientService.create(convertedFile);
    console.log(convertedFile);
    await this.dbService.stop();
  }
}
