require('dotenv').config();
const express=require('express')

const mongoose=require('mongoose')
const app=express()
const cors=require('cors')
const cookieParser=require('cookie-parser')
const urlencoded=require('express')
const vehicleRoutes=require('./routes/vehicles')

const userRoutes=require('./routes/User')
const port=5000

app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:3000",
    methods:['GET','POST','PUT','DELETE'],
    credentials:true,
}))
app.use(express.json())
app.use(urlencoded({ extended: true }));
const mongo_url="mongodb://localhost:27017/arm"
mongoose
.connect(mongo_url)
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log("error",err))
app.use('/',vehicleRoutes)
app.get('/',(req,res)=>{
    res.send('hi')
})

app.get('/test',(req,res)=>{
    console.log("test")
    res.send("test")
})

app.use('/',vehicleRoutes)
app.use('/',userRoutes)
const Authroutes=require('./routes/Auth')
app.use('/Auth',Authroutes)


app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})
