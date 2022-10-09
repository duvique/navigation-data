import { MongoClient, ServerApiVersion, Db } from 'mongodb';

const init = async () => {
  try {
    const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PWD}@navigationdata.7ejkhzk.mongodb.net/?retryWrites=true&w=majority`;
    console.log('aqui');

    const mongoClient = new MongoClient(uri, {
      serverApi: ServerApiVersion.v1,
    });
    await mongoClient.connect().then(conn => {
      global.db = conn.db(process.env.MONGODB_DATABASE);
    });
  } catch (e) {
    console.log(`> [MONGODB][INIT][ERROR]: An error ocurred:`);
    console.log(e);
  }
};

export default init();
