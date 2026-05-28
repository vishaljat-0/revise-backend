require('dotenv').config()
const connectdb= require("./src/config/db")

const app = require("./src/app")


connectdb()

app.listen(3000,(req,res)=>{
console.log("server is running  on port 3000");

})