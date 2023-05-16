//  here we need to import model beacuse we need to update it , its like empty table like we did previously adding documents in table
// In controller, it is Api logic here  

const path=require('path');


const bookModel = require(path.join(__dirname,"../model/books.model"))


exports.create = (req, res) => {
    if (!req.body.title || req.body.title == " ") {
        res.status(400).json({ message: "title cannot be empty" })
    }

    const { title, author, published, price } = req.body;
    const book = new bookModel({ title, author, published: published ? published : false, price })

    book.save()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "some error  occured while creating book" })
        })

    }



    exports.fetchall = (req, res) => {
        bookModel.find()
            .then(data => {
                if (!data) {
                    res.status(400).send({ message: "something went wrong" })
                }
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({ message: err })
            })
    }

    exports.fetchone = (req, res) => {
        var _id = req.params.id;
        bookModel.find({ _id })
            .then(data => {
                if (!data) {
                    res.status(400).send({ message: "something went wrong" })
                }
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({ message: err })
            })

    }

    exports.update = (req, res) => {
        var _id = req.params.id;

     const userrole=req.user.role;
    
     if (userrole!="admin") 
     {
        res.status(403).send({message:"only admin users are allowed to do this operation"})
        
     }

        bookModel.findByIdAndUpdate(_id, req.body, {})
            .then(data => {
                if (!data) {
                    res.status(400).send({ message: "something went wrong" })
                }
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({ message: err })
            })




    }

    exports.deleteone = (req, res) => {
        var _id = req.params.id;
        bookModel.findByIdAndDelete(_id, {})
            .then(data => {
                if (!data) {
                    res.status(400).send({ message: "something went wrong" })
                }
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({ message: err })
            })


    }

    exports.deleteall = (req, res) => {

        bookModel.deleteMany({})
            .then(data => {
                res.send({ message: "books deleted successfully" })
            })

    }








