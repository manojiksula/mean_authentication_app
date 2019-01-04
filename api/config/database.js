import mongoose from "mongoose";
import { MONGO_UI } from "./keys";

//Connecting to DataBase
mongoose.connect(MONGO_UI, {
  useNewUrlParser: true,
  useCreateIndex: true
});
mongoose.Promise = global.Promise;
let connection = mongoose.connection;

//Check for Errors
connection.on('error', (err) => {
  if (err) console.log(err);
});

//Check for Connection
connection.once('open', () => console.log(`connecting to mongodb...`));

export default connection;