const app = require("./src/app")
const connectDatabase= require("./src/config/db")




connectDatabase()
app.listen(3000,(req,res)=>{
    console.log("server is running on 3000 port")
})