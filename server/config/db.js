const mongoose = require('mongoose');
const dns = require('dns');

const connectDB = async () => {
  try {
    // Ensure reliable DNS resolution for MongoDB Atlas SRV across all networks/Windows
    if (process.env.MONGO_URI && process.env.MONGO_URI.startsWith('mongodb+srv://')) {
      try {
        dns.setServers(['8.8.8.8', '1.1.1.1']);
      } catch (err) {
        // fallback to default DNS
      }
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(` MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(` Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
