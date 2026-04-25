//createing first EXPRESS application
import 'dotenv/config'//it should be above the db import 
import express from 'express';
import userRouter from './routes/user.route.js';
import { errorHandler } from './libs/middleware.js';
import authRouter from'./routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app=express();//creating  server by calling the function 
const PORT=8000;

//JSON middleware
app.use(cookieParser());
app.use(
    cors({
        origin:process.env.CLIENT_URL,
        credentials:true,
    })
);

app.use(express.json());//it enables express to parse the incoming JSON data and populate the req.body object with that data
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth',authRouter);

// app.get('/',(req,res)=>{
//     res.status(200).json({message:'hello world!'});
// }); to be deleted 

app.use('*',(req,res)=>{
    res.status(404).json({message:'not found'});
});
app.use(errorHandler);
//* is a wildcard route
//starting EXPRESS srever 

app.listen(PORT,()=>{
    console.log(`server is runnig on the port ${PORT}`);
})