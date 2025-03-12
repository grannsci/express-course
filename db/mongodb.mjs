//const MongoClient = require('mongodb').MongoClient;
import { MongoClient } from 'mongodb';

const connectionString = 'mongodb://localhost:27017'; //default mongodb port. This can also be changed to a remote server usiing an environment variable: process.env.MONGO_URL
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}
let db = conn.db("express-course");
export default db;