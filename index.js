import express from 'express';
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import projectsRouter from './routes/projects.js'
import cors from 'cors'

dotenv.config() //means to use .env file
const app=express()
const PORT=process.env.PORT||4000;

//   =======connect to DataBase ===========
try{await mongoose.connect(process.env.MONGODB_URI)
    console.log(`Connected to MONGODB`)
}catch(error){
    console.error(error)
}



// connect Middleware    =======
app.use(morgan('dev')) //logger
app.use(express.json()) //parse data
app.use(express.urlencoded({extended:true}))
app.use(cors()) //localhost to interact with each other, allow backend to talk to frontend in the same machine

//======Routes=======
app.use('/api/projects', projectsRouter)
app.get('/', (req, res)=>{res.send('Welcome to my API')})


//=========Error Middleware======
app.use((e, req,res,next)=>{
    console.error(e);
    res.status(500).json({message:e.message, error:e})
})


app.listen(PORT,()=>console.log(`Server at ${PORT}`))