import mongoose from 'mongoose'
import dotenv from 'dotenv'
import products from './data/products.js'
import users from './data/users.js'
import User from './Database/models/userModel.js'
import Product from './Database/models/productModel.js'
import Order from './Database/models/orderModel.js'
import connectDatabase from './Database/db.js'

dotenv.config()
connectDatabase()
const importData = async () => {
  try {

    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id
    const sampleProducts = products.map(product => (
      {
        ...product,
        user: adminUser
      }
    ))
    await Product.insertMany(sampleProducts)
    console.log('Data Imported 🥳');
    process.exit()
  } catch (error) {
    console.log('importData -> error', error)
    process.exit(1)

  }
}


const destroyData = async () => {
  try {

    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()
    console.log('Data Destroyed 😱');
    process.exit()
  } catch (error) {
    console.log('destroyData -> error', error)
    process.exit(1)

  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}