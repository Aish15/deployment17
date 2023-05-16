
const path=require('path');

const userscontroller=require(path.join(__dirname,"../controller/users.controller"));
module.exports=app=>{
     app.post("/api/register",userscontroller.register);
     app.post("/api/login",userscontroller.login);
    }
