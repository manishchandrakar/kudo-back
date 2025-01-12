import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Directly hardcode the MongoDB URI
    // const mongoURI = 'mongodb://localhost:27017/Kudos';  
    const mongoURI = 'mongodb+srv://manishchandrakar2001:PUrRZkY3POiCC5vN@cluster0.w5fmnnm.mongodb.net/kudos'

    // 
    // // Update the URI as needed

    // Connect to MongoDB
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
