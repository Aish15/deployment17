const mongoose=require('mongoose')
const userSchema = mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        lowercase:true,
        unique:[true,"email already exists"],
        required:true
    },
    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        // we are setting enum value , it means i can be only two values either admin or normal
        enum:["admin","normal"]

    }
});

const userModel=mongoose.model('users',userSchema);


module.exports=userModel