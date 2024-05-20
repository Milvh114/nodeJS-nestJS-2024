import * as mongoose from 'mongoose';
require('dotenv').config();

// const url= "mongodb+srv://lvhm114:lvhm114@mongose.hb3izsh.mongodb.net/abc?retryWrites=true&w=majority&appName=mongose"

const url= "mongodb+srv://lvhm114:lvhm114@mongose.hb3izsh.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=mongose"

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGOOSE_DB_SRV, { dbName: 'abc' }),
      // mongoose.connect(url),
  },
];