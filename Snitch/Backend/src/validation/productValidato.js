import {body,validationResult} from "express-validator";

 const validator =(req,res,next)=>{
const error = validationResult(req)
 if(!error.isEmpty()){
res.status(400).json({
    errors:error.array()
})

 }
 next();
 }

 export const postValidation=[
body("productName").notEmpty().withMessage("product name is required"),
body("description").notEmpty().withMessage("description is required"),
body("price").notEmpty().isNumeric().withMessage("price is required"),

 validator
]