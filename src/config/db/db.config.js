const { DB_HOST, DB_PORT, DB_NAME } = process.env;

export class DbConfig {
  connectionURI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  options = { useNewUrlParser: true, useUnifiedTopology: true };
}
