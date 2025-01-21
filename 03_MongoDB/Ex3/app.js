const connectMongoDB = require('./db/mongodb')
require('dotenv').config()


const start = async () => {
    try {
      await connectMongoDB(process.env.CONN_STRING)
    } catch (error) {
      console.log(error)
    }
  }
  
  start()