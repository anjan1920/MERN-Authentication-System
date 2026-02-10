import express from  "express"

import {connectionDB} from './config/db.js'
import authRoutes from './routes/auth.js'

import dotenv from 'dotenv'
dotenv.config();

const PORT = process.env.PORT || 4000

const app = express();
app.use(express.json());//its tells the perse the coming data as json

//its redirect 
app.use("/api/users",authRoutes)

connectionDB()

app.listen(PORT ,()=>{
    console.log(`Server start at port ${PORT}`);
    
})