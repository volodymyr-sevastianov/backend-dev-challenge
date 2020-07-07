import mongoose from 'mongoose';

import { DBConfig } from '../../config/db/db.config';

export class DBService {
  constructor(dbConfig = new DBConfig()) {
    this.dbConfig = dbConfig;
  }

  async exec() {
    await mongoose.connect(this.dbConfig.connectionURI, this.dbConfig.options);
  }

  async stop() {
    await mongoose.disconnect();
  }
}
