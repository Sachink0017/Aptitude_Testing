//createing first EXPRESS application
import 'dotenv/config'//it should be above the db import 
import { db } from './libs/dbConnect.js';
import express from 'express';
import userRouter from './routes/user.route.js';
const app=express();//creating  server by calling the function 
const PORT=8000;

app.use('/api/v1/users', userRouter);
app.get('/',(req,res)=>{
    res.status(200).json({message:'hello world!'});
});
app.use('*',(req,res)=>{
    res.status(404).json({message:'not found'});
});
//* is a wildcard route
//starting EXPRESS srever 

app.listen(PORT,()=>{
    console.log(`server is runnig on the port ${PORT}`);
})