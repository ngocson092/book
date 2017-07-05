import express from 'express'
import mongodb from 'mongodb'
const router = express.Router();
const DB_URL = 'mongodb://sonlexus:123qwe123@ds133932.mlab.com:33932/redux'


const  validate = (form)=> {
    console.log(form);
    let errors = {}
    if (typeof form.title == 'undefined' || form.title == '')
    {
        errors.title = 'title not empty'
    }
    if (typeof form.url == 'undefined' || form.url == '')
    {
        errors.url = 'url not empty'
    }else if(!form.url.match(/\.(jpeg|jpg|gif|png)$/)){
        errors.url = 'url is invalid'
    }
    return {
        isValid: Object.keys(errors).length == 0,
        errors
    }
}

mongodb.MongoClient.connect(DB_URL,function (err,db) {
    if(err)
        throw 'cannot connect to db'

    router.get('/games',function (req,res) {
         db.collection('games').find({}).toArray((err,games)=>{
             res.send(games)
        })
    })
    router.post('/games',function (req,res) {


        let {isValid, errors} = validate(req.body)

        if(isValid){
            db.collection("games").insertOne(req.body, function(errors, new_record) {
                if (errors)
                    res.status(500).json({status:0,errors})
                res.send({status:1})
            });

        }else{
            return res.status(500).json({status:0,errors})
        }
    })

    router.delete('/games',function (req,res) {

        let id = req.params.id

        db.collection("games").deleteOne({id}, function(errors, record_delete) {
            if (errors)
                res.status(500).json({status:0,errors})
            res.send({status:1,game:record_delete})
        });
    })

})


export default router

