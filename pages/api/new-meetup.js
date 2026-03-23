import { MongoClient } from "mongodb";

// /api/new-meetup
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb://reeyahtt:reeyahtt@ac-a1dycsw-shard-00-00.9xjnmnw.mongodb.net:27017,ac-a1dycsw-shard-00-01.9xjnmnw.mongodb.net:27017,ac-a1dycsw-shard-00-02.9xjnmnw.mongodb.net:27017/?ssl=true&replicaSet=atlas-tp3k6w-shard-0&authSource=admin&appName=Cluster0",
    );
    const db = client.db("meetups");

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);
    client.close();
    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;

// readAndWriteDatabase;
//reeyahtt
