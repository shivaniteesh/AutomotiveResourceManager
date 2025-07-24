const express=require('express')

const Vehicle=require('../models/Vehicle')
const router=express.Router()

router.get('/vehicles', async (req,res)=>{
    try{
        const vehicle=await Vehicle.find()
        
       
        res.json(vehicle)

    }catch(error){
        res.status(500).json({message:'Error fetching'})
    }
})
module.exports=router