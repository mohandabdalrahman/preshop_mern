import Order from '../Database/models/orderModel.js'
import asyncHandler from 'express-async-handler'


const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

  if (orderItems.length === 0) {
    res.status(404)
    throw new Error('no order items')
  }

  const createdOrder = await Order.create({ user: req.user._id, orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice })
  res.status(201).json(createdOrder)
})

export {
  createOrder
}