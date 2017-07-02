import express from 'express'
import mongodb from 'mongodb'
const router = express.Router();
const DB_URL = 'mongodb://sonlexus:123qwe123@ds133932.mlab.com:33932/redux'

mongodb.MongoClient.connect(DB_URL,function (err,db) {
    if(err)
        throw 'cannot connect to db'

    router.get('/games',function (req,res) {
         db.collection('games').find({}).toArray((err,games)=>{
             res.send(games)
        })
    })

})


export default router

