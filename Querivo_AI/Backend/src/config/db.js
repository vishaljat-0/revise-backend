import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI ;

  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect(mongoURI, {  
      autoIndex: true,
    });

    console.log(`MongoDB connected`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
};

export default connectDB;
