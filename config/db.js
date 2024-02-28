const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const mongoURI = process.env.MONGO_URI;

const startDatabase = async () => {
  try{
    await mongoose.connect(mongoURI)

    console.log('📦 connected to mongoDB')
  }catch(err){
    console.log('❌ error connecting to mongoDB:', err.message);
  }
};

const stopDatabase = async () => {
  try{
    if(mongoServer){
      await mongoose.disconnect();
      await mongoServer.stop();
  
      console.log('Stoped');
    }
  }catch(err){
    console.log('❌ error connecting to mongoDB:', err.message);
  }
};

const isConnected = () => {
  return mongoose.connection.readyState === 1;
}

module.exports = { startDatabase, stopDatabase, isConnected };
