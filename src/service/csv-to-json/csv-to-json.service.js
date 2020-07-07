import camelcaseKeys from 'camelcase-keys';
import csvtojson from 'csvtojson';

import { CsvToJsonConfig } from '../../config/csv-to-json/csv-to-json.config';
import { SourceFileConfig } from '../../config/source-file/source-file.config';

export class CsvToJsonService {
  constructor(csvToJsonConfig = new CsvToJsonConfig(), sourceFileConfig = new SourceFileConfig()) {
    this.csvToJsonConfig = csvToJsonConfig;
    this.sourceFileConfig = sourceFileConfig;
  }

  async convert(csvFilePath = this.sourceFileConfig.path) {
    let convertedJSONFile = await csvtojson(this.csvToJsonConfig).fromFile(csvFilePath);
    convertedJSONFile = camelcaseKeys(convertedJSONFile);

    return convertedJSONFile;
  }
}
