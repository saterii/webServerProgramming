require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_CONN_STRING
  : process.env.CONN_STRING

module.exports = {
  MONGODB_URI,
  PORT
}