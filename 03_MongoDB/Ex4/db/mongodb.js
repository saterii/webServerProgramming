const mongoose = require('mongoose')

const connectMongoDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "albumdb",
  })
}

module.exports = connectMongoDB