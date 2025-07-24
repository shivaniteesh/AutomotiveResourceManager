const express=require('express')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const multer = require('multer');
const mongoose=require('mongoose')
const User=require('../models/User');
const Vehicle=require('../models/Vehicle')
const Payment=require('../models/Payment');
const Issue = require('../models/Issue');
const router=express.Router()
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post('/userDetails', upload.fields([
  ]), async (req, res) => {
    try {
      const { name, email, password, phone, aadhar, license, address } = req.body;
  
   console.log('Request Body:', req.body); 
     
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User exists" });
      }
      
      const newUser = new User({
        name,
        email,
    
        aadhar,
       
        phone,
        password,
        license,
        
        address,
        role: 'User'
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User registered' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.post('/img',async (req,res)=>{
    const {img,license,vehicle}=req.body
    if(vehicle==='car'){
       vimage=await Car.findByOneAndUpdate({license:license},{$set:{img:img}},{new:true})

    } 
    else{
       vimage=await Bike.findByOneAndUpdate({license:license},{$set:{img:img}},{new:true})
      
    }
    vimage.save()
    req.status(200).json({message:'image uploaded'})
  })
router.post('/login',async (req,res)=>{
    try{
    const {email,password,role}=req.body
    console.log('Received login request:', { email, role,password });
    const user=await User.findOne({email})
    if(!user){
        return res.status(400).json({message:"invalid data"})
    }
    
    const match=await bcrypt.compare(password,user.password)
    console.log('Password ',password );
    console.log('user.password',user.password)
    if(!match){
        
        return res.status(401).json({message:"invalid password"})
    }
    if (user.role !== role) {
      return res.status(403).json({ message: "Unauthorized role" });
  }
    const token=jwt.sign({email:user.email,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'})
    res.cookie('token',token,{httpOnlytrue:true,secure:process.env.NODE_ENV})
    res.status(200).json({message:'login suucesful',token})
}catch(error){
    console.error('error',error)
    res.status(500).json({message:'server error'})
}
})
const authenticateToken=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.sendStatus(401)
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return res.sendStatus(403)
        }
        req.user=user
        next()
    })
}
const authorizeRoles=(roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.sendStatus(403)
        }
        next()
    }
}
router.post('/User',authenticateToken,authorizeRoles(['User']),(req,res)=>{
    res.json({message:'this is uder route',email:req.user.email,role:req.user.role})
})
router.post('/admin',authenticateToken,authorizeRoles(['Admin']),(req,res)=>{
    res.json({message:'this is admin route',email:req.user.email,role:req.user.role})
})
router.post('/logout',(req,res)=>{
    res.clearCookie('token')
    res.status(200).json({message:"logged out successfully"})
})
router.post('/vehicle', async (req, res) => {
    try {
      const { model,type,dailyrate,license,mileage,fueltype} = req.body;
     
  
  
      const existing=await Vehicle.findOne({license})
      if (existing) {
        return res.status(400).json({ message: "vehicle exists" });
      }
   
     
       const newvehicle=new Vehicle({model,type,dailyrate,license,mileage,fueltype})
      
  
      await newvehicle.save();
      console.log('vehicle',newvehicle)
      res.status(201).json({ message: 'vehicle registered' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
 
  router.get('/userDetails', authenticateToken, async (req, res) => {
    try {
        const userEmail = req.user.email;  

       
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
       
       
        res.json({
          userid:user.userid,
            name: user.name,
            email: user.email,
            phoneNumber: user.phone,
            aadhar: user.aadhar,
            license: user.license,
            address: user.address,
            role: user.role
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.post('/payment',async (req,res)=>{
  try{
  const {vehicleid,from,to,total,userid}=req.body
  const fromdate=new Date(from)
  const todate=new Date(to)
  const payment = new Payment({vehicleid,from:fromdate,to:todate,total,userid})
  payment.save()
  console.log('payment',payment)
      res.status(201).json({ message:'bill done' });
  }catch(error){
    console.error(error)
    res.status(500).json({message:"server error"})
  }
})
router.get('/bill', async (req, res) => {
  try {
    const bill = await Payment.findOne().lean(); 
    if (!bill) {
      return res.status(400).json({ message: 'No bill found' });
    }

    return res.json(bill);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/availability',async (req,res)=>{
  try{
    const {vehicleid,from,to}=req.body
    const vid=vehicleid
    if(!from || !to){
      return res.status(400).json({message:'missing dates'})
    }
    
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const overlap=await Payment.find({vehicleid:vid,from:{$lte:toDate},to:{$gte:fromDate}})
    if(overlap.length>0){
      return res.json({available:false})
    }
      else{
        return res.json({available:true})
      }
      
    }
  catch(error){
    console.error('error',error)
    res.status(500).json({message:'server error'})
  }})
router.get('/transaction',async (req,res)=>{
  try{
   const vtrans=await Payment.aggregate([
    {
      $group:{
        _id:'$vehicleid',
        transactionid:{$push:'$paymentid'}
      }
    },
    {$sort:{_id:1}}
   ])
   const utrans=await Payment.aggregate([
    {
      $group:{
        _id:'$userid',
        transactionid:{$push:'$paymentid'},
      }
    },
    {$sort:{_id:1}},
   ]);
    res.json({vtrans,utrans})
  }catch(error){
    console.error(error)
    res.status(500).json({message:"server error"})
  }
})

router.post('/issue',(req,res)=>{
  try{
    const {license,paymentid,issue}=req.body
    const issues=new Issue({license,paymentid,issue})
    issues.save()
    console.log(issues)
    res.status(201).json({message:'issue raised'})
  }catch(error){
    console.error(error)
    res.status(500).json({message:'server error'})
  }
})
router.get('/issue',async (req,res)=>{
  try{

    const issues=await Issue.find()
    res.json({issues})
    console.log(issues)
  }catch(error){
    console.error(error)
    res.status(500).json({message:'server error'})
  }
})
module.exports =router