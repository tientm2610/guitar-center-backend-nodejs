import { MongoClient } from "mongodb";

const DATABASE_NAME = "guitar_center";

  const conn = await MongoClient.connect(`mongodb://localhost`);
  const db = conn.db(DATABASE_NAME);
  
  console.log(`MongoDB đã được kết nối...DATABASE_NAME: ${DATABASE_NAME}`);
  
export default db;