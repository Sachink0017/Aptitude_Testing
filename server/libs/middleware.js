export const errorHandler=(err,req,res,next)=>{
    const defaultMessage="We are having technical issues. Please try again Later";
    const {status,message,error}=err;
    if(error)
    {
        console.log(error);
    }
    res.status(status).json({message:message || defaultMessage});
};
