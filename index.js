import express from 'express';
import morgan from 'morgan'; //Morgan is a HTTP request with predefined formats for logging, without morgan, the progress is not going to show in terminal
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import projectsRouter from './routes/projects.js'
import cors from 'cors' //connect backend with frontend in the same computer

dotenv.config() //means to use .env file  config method takes a .env file path as an argument, it parses it and sets environment vars defined in that file in process.env
const app=express()
const PORT=process.env.PORT||4000;

//   =======connect to DataBase ===========
try{await mongoose.connect(process.env.MONGODB_URI)
    console.log(`Connected to MONGODB`)
}catch(error){
    console.error(error)
}
//check whether we can connect to MongoDB



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