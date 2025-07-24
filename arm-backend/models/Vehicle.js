const mongoose=require('mongoose')
const uuid = require('uuid');
const VehicleSchema=mongoose.Schema({
    vehicleid:{ type: String, unique: true, default: () => uuid.v4() },
    img:Buffer,
    license:String,
    model:String,
    mileage:String,
    fueltype:String,
    type:{type:String,enum:['Car','Bike']},
    dailyrate:String,
    availability:{type:Boolean ,default:true},
   contentType:String,
},{collection:'Vehicle'});
VehicleSchema.pre('save', async function(next) {
  
    if (!this.vehicleid) {
        this.vehicleid = uuid.v4(); 
      }
    next();
});
module.exports=mongoose.model('Vehicle',VehicleSchema)