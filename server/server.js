import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './config/mongodb.js'

const PORT = process.env.PORT || 4000

// create app
const app = express()
// use cors
app.use(express.json())
app.use(cors())
// connecting the express application with the mongodb db
await connectDB()



app.get('/', (req, res)=> {
  res.status(200).send('API Working!')
})

app.listen(PORT, ()=> {
  console.log('Server running at',PORT);
});
