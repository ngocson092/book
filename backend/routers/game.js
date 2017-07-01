import express from 'express'
const router = express.Router();

router.get('/games',function (req,res) {
    return res.send([
        {
            title:'game 1',
            image:''
        }
    ])
})
export default router

