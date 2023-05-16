const path=require('path');

const jwt=require('jsonwebtoken');
// now we need a function to verify  whether our token is valid or not.

const userModel=require(path.join(__dirname,"../model/users.model"));



const verifytoken=(req,res,next)=>{
 
if ( req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0]==="JWT")
{

 jwt.verify(req.headers.authorization.split(' ')[1],process.env.SECRET,function(err,verifiedtoken){
    if(err){
        console.log(err);
        res.status(403).send({message:"invalid JWT Token"})
    }

    userModel.findById(verifiedtoken.id)
    .then(user=>{
        req.user=user;
        next();
    })
    .catch(err=>{
        res.status(500).send({message:err.message})
    })

 })
}
else{
    res.status(403).send({message:"Token not present"})
    next();
}

}

module.exports=verifytoken;

