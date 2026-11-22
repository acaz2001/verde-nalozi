import { MongoClient } from 'mongodb';

const client = new MongoClient("mongodb+srv://acazivkovic012_db_user:<db_password>@cluster0.ckiqbf7.mongodb.net/?appName=Cluster0");

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await client.close();
}