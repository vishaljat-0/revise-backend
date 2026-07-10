const jwt = require("jsonwebtoken");
const blackListModel = require("../model/blacklistModel");

const authMiddleware =async(req, res, next) => {

  const token = req.cookies.token;
  const tokenBlacklisted= await blackListModel.findOne({token})
  if (tokenBlacklisted) {
    return res.status(401).json({ success: false, message: "token blacklisted" });
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    let decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    req.user = decodedToken;

    next();
  } catch (error) {
    console.log(error);
    
    return res.status(401).json({ success: false, message: "Unauthorized" });

  }
};

module.exports = { authMiddleware };
