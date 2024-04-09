import { MongoClient } from "mongodb";

const DATABASE_NAME = "guitar_center";
let productColl;
let userColl;

const main = async () => {
  const conn = await MongoClient.connect(`mongodb://localhost`);
  const db = conn.db(DATABASE_NAME);
  productColl = db.collection(`product`);
  userColl = db.collection(`user`);

//   let allUsers = await userColl.find().toArray();
// console.log(allUsers)
let productId = `P01`;
const document = await productColl.findOne({productId});
console.log(document)
    

};
main();

const userData = {
  user: [
    {
      id: "mchang",
      name: "Michael",
      avatarURL: "images/stanford.png",
      following: [],
    },
    {
      id: "mtien",
      name: "Tien",
      avatarURL: "images/profile_red.png",
      following: [],
    },
  ],
};
