import express from 'express'
const app = express()
import game from './routers/game'

app.use('/api',game)

app.listen(3001,function (err) {
    console.log('server is running');
})