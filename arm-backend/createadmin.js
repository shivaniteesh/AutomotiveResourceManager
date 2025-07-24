const mongoose=require('mongoose')
const User=require('./models/User')
const bcrypt=require('bcryptjs')
mongoose.connect('mongodb://localhost:27017/arm')
async function createadmin(){
    try{
        const existingadmin=await User.findOne({role:"Admin"})
        if(existingadmin){
            console.log('admin already exists')
            process.exit()
        }
        const hashedPassword=await bcrypt.hash('s9p9s4s7',10)
        const admin=new User({
            email:"shivaniteeshd@gmail.com",
            password:hashedPassword,
            role:"Admin",
        })
        await admin.save()
        console.log('Admin created')
        process.exit()
    }catch(error){
        console.log("Error creating admin")
        process.exit(1)
    }
}
createadmin()