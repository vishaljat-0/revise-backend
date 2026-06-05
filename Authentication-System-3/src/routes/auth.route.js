const express= require('express');
const { registerContoller, LoginContoller, getmeContoller } = require('../controller/auth.controller');
const router= express.Router();


router.post("/register",registerContoller)
router.post("/login",LoginContoller)
router.get("/get-me", getmeContoller)




module.exports = router;