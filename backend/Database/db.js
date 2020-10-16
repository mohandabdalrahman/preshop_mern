import mongoose from 'mongoose';

const connectDatabase = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB Connection Succeeded.👍')
  } catch (error) {
    console.log(`Error in DB connection: ${error.message}`)
    process.exit(1)
  }
}

export default connectDatabase
