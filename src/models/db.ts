import Mongoose from 'mongoose';

const { MONGOURL } = process.env;

export const connect = (): void => {
  Mongoose.connect(MONGOURL || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });
  const db = Mongoose.connection;
  db.on('error', (error: string) => {
    console.log('Mongo error! ', error);
  });
  db.once('open', () => {
    console.log('Mongo connected!');
  });
};
