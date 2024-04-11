import express from "express"

//we need two dependcies cookieParse and cors(Cross origin resourse sharing)
import cookieParser from "cookie-parser"
import cors from "cors"

//it's a common name give to app created by using express
const app = express()

//app.use for the middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
//These are three major operation

//when data is comming from "form" we use this method to get the data
app.use(express.json({limit: "16kb"}))

app.use(express.urlencoded({extended: true, limit: "16kb"})) // this will also work
//app.use(express.urlencoded({extended: true, limit: "16kb"}))

 
app.use(express.static("public"))

//cookieParser
app.use(cookieParser)




//routes import
import userRouter from "./routes/user.routes.js"

//routes decleartion
app.use("/api/v1/users", userRouter)

//url that will be formed
//http://localost:8000/api/v1/users/


export {app}