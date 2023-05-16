const mongoose=require('mongoose')
const bookSchema = mongoose.Schema({
    title: String, // String is shorthand for {type: String}
    author: String,
    published:Boolean,
    price:Number
    
});

const bookModel=mongoose.model('books',bookSchema);


module.exports=bookModel