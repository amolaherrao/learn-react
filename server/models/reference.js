import { connect, Schema, model } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_HOSTNAME = process.env.DB_URL;

/**
 * @desc how to connect database
 * @return Object
 */
export const connectDatabase = async () => {
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
};

//Schemas
//Defining schema
const carSchema = Schema({
  title: String,
  color: String,
  brand: String,
  variant: String,
});

/**
 * @desc SchemaTypes
 * @var key String
 * @var key Number
 * @var key Date
 * @var key Buffer
 * @var key Boolean
 * @var key Mixed
 * @var key ObjectId
 * @var key Array
 * @var key Decimal128
 * @var key Map
 * @var key UUID
 */

//Creating a model
const carModel = model("cars", carSchema);

//All Schema Types
/**
 * @desc String
 * @type lowercase Boolean
 * @type uppercase Boolean
 * @type trim Boolean
 * @type match RegExp
 * @type enum Array
 * @type minLength Number
 * @type maxLength Number
 * @type populate Object
 */

/**
 * @desc Number
 * @type min Number
 * @type max Number
 * @type enum Array
 * @type populate Object
 */

/**
 * @desc Date
 * @type min Date
 * @type max Date
 * @type expires Number|String
 */

/**
 * @desc ObjectId
 * @type populate Object
 */

/**
 * @desc Indexes
 * @type index Boolean
 * @type unique Boolean
 * @type sparse Boolean
 * @type required Boolean
 * @type default Any
 * @type validate function
 */


