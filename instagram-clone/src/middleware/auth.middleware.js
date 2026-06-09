
const jwt = require("jsonwebtoken");

const authMiddleware=async(req,res,next)=>{
    const token = req.cookies.token 
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Unauthorized access ,token not found"
        })
    }

    let decoded = null
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;

    next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Unauthorized access ,token invalid"
        })

    }
   
}

module.exports=authMiddleware