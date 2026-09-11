import { Router } from "express";
import { productAddController } from "../contollers/productController.js";
import { postValidation } from "../validation/productValidato.js";
import { authenticateSeller } from "../middleware/authMiddleware.js";
import multer from "multer";

const storage = multer.memoryStorage({});
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

const router = Router();

router.post(
  "/",
  authenticateSeller,
  upload.array("images", 5),
  postValidation,
  
  productAddController,
);

export default router;
