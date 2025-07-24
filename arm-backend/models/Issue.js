const mongoose=require('mongoose')
const uuid=require('uuid')
const IssueSchema=mongoose.Schema({
    paymentid:String,
    license:String,
  
    issue:String,
    issueid:{ type: String, unique: true, default: () => uuid.v4() },
})
IssueSchema.pre('save', async function(next) {
  
    if (!this.issueid) {
        this.issueid = uuid.v4();  
      }
    next();
});
module.exports=mongoose.model('Issue',IssueSchema)