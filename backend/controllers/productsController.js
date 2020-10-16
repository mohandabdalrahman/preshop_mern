import Products from '../Database/models/productModel.js'
import asyncHandler from 'express-async-handler'
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Products.find({})
  res.status(200).json(products)
})

const getProductById = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id)
  product ? res.status(200).json(product) : res.status(404).json({ message: 'product not found' })
})


export {
  getAllProducts, 
  getProductById
}