const  mongoose=require('mongoose')
const vehicles=require('./models/VehiclesDetails')
const Car=require('./models/Car')
const Bike=require('./models/Bike')
mongoose.connect('mongodb://localhost:27017/arm')

const insertData=async ()=>{
    try{
        for(const car of vehicles.Cars){
            await Car.findOneAndUpdate(
                {model:car.model},
                car,
                {upset:true,new:true,setDefaultOnInsert:true}
            )
        }
        for(const bike of vehicles.Bikes){
            await Bike.findOneAndUpdate(
                {model:bike.model},
                bike,
                {upset:true,new:true,setDefaultOnInsert:true}
            )
        }
        console.log("vehicles updated")
        mongoose.connection.close()
        
    }catch(error){
        console.error('error',error)
    }
}
insertData();