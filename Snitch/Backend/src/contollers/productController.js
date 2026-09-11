import productModel from "../models/product.model.js";
import imageKitUpload from "../services/imageKit.service.js";

export const productAddController = async (req, res) => {
  try {
    const seller = req.user;
    const { productName, description, price } = req.body;
    const imageUrl = await imageKitUpload(req.files);

    const product = await productModel.create({
      productName,
      description,
      price: {
        amount: price,
      },
      images: imageUrl.map((url) => ({ url })),
      seller: seller._id,
    });

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ error, message: error.message });
  }
};
