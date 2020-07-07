import { DbConfig } from '../../config/db/db.config';
import mongoose from 'mongoose';

export class DbService {
  constructor(dbConfig = new DbConfig()) {
    this.dbConfig = dbConfig;
  }

  async exec() {
    await mongoose.connect(this.dbConfig.connectionURI, this.dbConfig.options);
  }

  async stop() {
    await mongoose.disconnect();
  }
}
