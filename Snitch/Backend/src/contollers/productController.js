import productModel from "../models/product.model.js";
import imageKitUpload from "../services/imageKit.service.js";

export const productAddController = async (req, res) => {
  try {
    const seller = req.user;
    const { productName, description, price, currency } = req.body;
    const imageUrl = await imageKitUpload(req.files);

    const product = await productModel.create({
      productName,
      description,
      price: {
        amount: price,
        currency:currency
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
export const getProductsController = async (req, res) => {
  const seller = req.user;

  try {
    const products = await productModel.find({ seller: seller._id });
    res
      .status(200)
      .json({ message: "Products fetched successfully", products });
  } catch (error) {
    res.status(500).json({ error, message: error.message });
  }
};
