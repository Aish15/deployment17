const path=require('path');

const userModel = require(path.join(__dirname,"../model/users.model"));
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');




exports.register = (req, res) => {

     const { fullname,email,password,role }= req.body;
    //  const userrole=req.user.role;
    //  console.log(userrole);

    //  if (userrole!="admin") 
    //  {
    //     res.status(403).send({message:"only admin users are allowed to do this operation"})
        
    //  }


     const user=new userModel({ fullname,email,password:bcrypt.hashSync(password,10) , role});
     user.save()
     .then(data => {
        res.send({message:"User registered successfully"})
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "some error  occured while creating book" })
    })



    }

    exports.login=(req,res)=>{

        const {email,password}=req.body;

        //findone returns the whole documents

        userModel.findOne({email:email})
        .then(data=>{
            if(!data){
                res.status(404).send({message:"email not found"})
            }

            //compare password

            var ispasswordvalid=bcrypt.compareSync(password,data.password)

            if(!ispasswordvalid){
                res.status(401).send({message:"Invalid password"})
            }

            // creating token using id and key

            var token=jwt.sign({id:data._id},process.env.SECRET)

            res.send( {
                user:{
                    id:data._id,
                    email:data.email,
                    fullname:data.fullname,
                    role:data.role
                },
                accesstoken:token
            })

        })
        .catch(err=>{
            res.status(500).send({message:err.message})
        })

    }
