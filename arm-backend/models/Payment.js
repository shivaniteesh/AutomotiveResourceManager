const mongoose=require('mongoose')

const uuid=require('uuid')
const PaymentSchema=mongoose.Schema({
    paymentid:{ type: String, unique: true, default: () => uuid.v4() },
    from:Date,
    to:Date,
    total:String,
    userid:String,
    vehicleid:String,
    paymentTimestamp:{type:Date,default:Date.now},

})
PaymentSchema.pre('save', async function(next) {
  
    if (!this.paymentid) {
        this.paymentid = uuid.v4();  // Generating a custom ID when the user is created
      }
    next();
});
module.exports=mongoose.model('Payment',PaymentSchema)