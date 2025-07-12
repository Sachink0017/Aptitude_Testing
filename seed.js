import 'dotenv/config';
import {db} from "./libs/dbConnect.js";

//dummy data
//array of objects
const users=[
    {
        username:'sachin17',
        email:'sachin123@gmail.com',
        password:'123456',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        username:'nathan',
        email:'nathan@gmail.com',
        password:'secret123',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];
const tasks=[
    {
        name:'read atomic habits',
        description:'finish reading',
        priority:'not urgent',
        status:'open',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },

    {
        name:'learn MERNstack',
        description:'Learn the MERN',
        priority:'urgent',
        status:'open',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];
try{
    let collection=await db.collection('users');
    console.log('[seed]','Seeding user');
    const result=await collection.insertMany(users);
    console.log(result.insertedIds);
    console.log('[seed]','Seeding User Done');
    //seeding task1s
    tasks[0].owner=result.insertedIds[0];
    tasks[1].owner=result.insertedIds[1];

    collection=await db.collection('tasks');
    console.log('[seed]', 'seeding tasks...');
    await collection.insertMany(tasks);
    console.log('[seed]','seeding done');

    console.log('[seed]','all done');
}
catch(err)
{
    console.log('[seed]','Error:',err);
}
process.exit();