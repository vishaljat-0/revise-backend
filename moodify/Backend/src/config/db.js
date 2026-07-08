const mongoose= require("mongoose")


    const connectdb=async ()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            console.log("database connected");
        })
    } catch (error) {
        console.log(`database connection failed ${error}`);
        
    }
 }

module.exports={connectdb}