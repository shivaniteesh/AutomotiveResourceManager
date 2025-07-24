const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const uuid = require('uuid');
const UserSchema=new mongoose.Schema({
    userid: { type: String, unique: true, default: () => uuid.v4() },
    img:Buffer,
    name:String,
    role:{type:String,enum: ['User', 'Admin'],default:'User'},
    phone:{type:String,validate:/^\d{10}$/},
    aadhar:{type:String,validate:/^\d{12}$/},
    aadharpic:{data:Buffer,contentType:String},
    license:String,
    licensepic:{data:Buffer,contentType:String},
    email:{type:String,unique:true},
    password:{type:String,required:true},
},{timestamps:true})
UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        // Hash the password if it's modified or new
        this.password = await bcrypt.hash(this.password, 10);
    }
    if (!this.userid) {
        this.userid = uuid.v4();  // Generating a custom ID when the user is created
      }
    next();
});
module.exports=mongoose.model('User',UserSchema);