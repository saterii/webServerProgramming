const mongoose = require('mongoose')

const connectMongoDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'peopledb',
  })
}

module.exports = connectMongoDB