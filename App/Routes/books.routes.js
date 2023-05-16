// we will define our routes here

//GET  /api/books   -----> return all the books
const path=require('path');


const jwtauth=require(path.join(__dirname,"../middleware/authJWT"));


const Bookcontroller=require(path.join(__dirname,"../controller/model.controller"));
module.exports=app=>{
     app.post("/api/books",jwtauth,Bookcontroller.create);
    app.get("/api/books",Bookcontroller.fetchall);
    app.get("/api/books/:id",Bookcontroller.fetchone);
    
     app.put("/api/books/:id",jwtauth,Bookcontroller.update);
     app.delete("/api/books/:id",jwtauth,Bookcontroller.deleteone);
     app.delete("/api/books",jwtauth,Bookcontroller.deleteall);
}
