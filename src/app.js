import express from "express"

//we need two dependcies cookieParse and cors(Cross origin resourse sharing)
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


//jab form se data aaye to usko lene ke liye h
app.use(express.json({limit: "16kb"}))

//jab url se data aayega
app.use(express.urlencoded({extended: true, limit: "16kb"}))

app.use(express.static("public"))


app.use(cookieParser())

export {app}