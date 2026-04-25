import { MongoClient, ServerApiVersion } from "mongodb";

const {MONGODB_URI, MONGODB_DATABASE} = process.env;//connection process require two environment variables to run properly

const client=new MongoClient(MONGODB_URI,{
    serverApi:{
        version:ServerApiVersion.v1,
        strict:true,
        deprecationErrors: true,
    },
});

try{
    //connect client to server
    await client.connect();
    await client.db().command({ping:1});
    console.log("Connected to MongoDB!");
}
catch(err)
{
    console.log(err);
}

export const db=client.db(MONGODB_DATABASE);//we select the database we want to use 