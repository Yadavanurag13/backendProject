//require('dotenv').config({path: './env'})


//we have to import dotenv firstly

import dotenv from "dotenv"
import mongoose, { connect } from "mongoose";
import { DB_NAME } from "./constants.js";

//this is standard way to config this dotenv
dotenv.config({
    path: './env'
}) 

import connectDB from "./db/index.js";
import { app } from "./app.js";

//connectDB was a async function which return promise
connectDB()
.then(() => {
    //when database get connected listen app to start server
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at Port ${process.env.PORT}`);
    })
    // app.on("error", (error)=> {

    // })
})
.catch((error) => {
    console.log("mongoDB connection failed !!", error);
})
















// function connectDB () {

// }

// connectDB();







/*import express from "express"
const app = express()
(async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on("error", (error)=> {
            console.log("Database is not able to talk", error);
            throw error;
        })

        app.litesn(process.env.PORT, ()=> {
            console.log(`Port is listening on Port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("ERROR:", error)
    }    
})()*/