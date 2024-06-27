import Product from "../models/Product.js";

export async function createProduct(req, res) {
  const { name, category, price, imgURL } = req.body;

  try {
    const newProduct = new Product({ name, category, price, imgURL });

    const productSaved = await newProduct.save();

    res.status(201).json(productSaved);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export async function getProductById(req, res) {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  res.status(200).json(product);
};

export async function getProducts(req, res) {
  const products = await Product.find();
  return res.json(products);
};

export async function updateProductById(req, res) {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
    new: true
  });

  res.status(204).json(updatedProduct);
};

export async function deleteProductById(req, res) {
  const { productId } = req.params;

  await Product.findByIdAndDelete(productId);

  res.status(204).json();
};
