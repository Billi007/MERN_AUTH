import dotenv from 'dotenv'
import express from 'express'
import router from './routes/auth.Routes.js'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import NAME from '../constants.js'
import cookieParser from 'cookie-parser'
const app = express()

dotenv.config({
    path: './.env'
})
 app.use(cookieParser())

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({
    extended:false,
    limit: "16kb"
}))

app.use(express.json({
    limit: "16kb"
}))

app.use('/', router )
//MONGODB CONNECTION
const mongodbConnection = async() => {
    try {
       const connectDB = await mongoose.connect(`${process.env.MONGODB_URI}/${NAME}`)
        console.log(` MONGODB CONNECTED !! DB HOST: ${connectDB.connection.host}`)
    } catch (error) {
        console.log("MONGODB CONNETCION ERROR : ", error)
        process.exit(1)
    }
}
mongodbConnection()
.then(() => console.log('Database connected successfully.'))
.catch((error) => console.log('Database connection error.', error))

app.listen(process.env.PORT || 3000, (req,res) => {
console.log(`server is running on port : ${process.env.PORT} ` )
})

export default app