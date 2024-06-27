import { connect } from "mongoose";
import { MONGODB_URI } from "./config.js";

try {
  const db = await connect(MONGODB_URI);
  console.log("Database is connected to", db.connection.name);
} catch (error) {
  console.error(error.message);
}