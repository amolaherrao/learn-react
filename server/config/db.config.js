import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_HOSTNAME = process.env.DB_URL;

async function connectDatabase() {
  try {
    const createConnection = await connect(DB_HOSTNAME, {
      dbName: process.env.DB_NAME || "persistent",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (createConnection.STATES.connected) console.log("Database connection Successfully");
    else console.log("Database connection failed");
  } catch (error) {
    const { name, message } = error;
    console.log(`${name} => ${message}`);
  }
}

export default connectDatabase;
