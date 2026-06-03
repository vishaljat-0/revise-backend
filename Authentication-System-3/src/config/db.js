const mongoose= require("mongoose")


const connectDatabase= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log("DATABASE IS CONNECTED SUCCESSFULLY");
            
        })
    } catch (error) {
        
    }
}
module.exports= connectDatabase