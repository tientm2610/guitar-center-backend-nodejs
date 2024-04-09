import { MongoClient } from "mongodb";

const DATABASE_NAME = "guitar_center";
let productColl;
let userColl;

const main = async () => {
  const conn = await MongoClient.connect(`mongodb://localhost`);
  const db = conn.db(DATABASE_NAME);
  productColl = db.collection(`product`);
let id = `A`;
   let productInCategory = await productColl.find({ categoryId: id }).toArray();
     
    console.log(productInCategory) 
  
};
main();
