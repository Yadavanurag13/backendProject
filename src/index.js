//require('dotenv').config({path: './env'})

import dotenv from "dotenv"
import mongoose, { connect } from "mongoose";
import { DB_NAME } from "./constants.js";

dotenv.config({
    path: './env'
}) 

import connectDB from "./db/index.js";

connectDB()
















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