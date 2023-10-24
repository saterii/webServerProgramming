const express = require('express')

const app = express()
const connectMongoDB = require('./db/mongodb')
const albums = require("./routes/albums")
const query = require("./routes/query")
const users = require('./routes/users')
const register = require("./routes/register")
app.use(express.json())
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))
require('express-async-errors')
require('dotenv').config()
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/errorhandler')



app.use('/api/albums', albums)
app.use('/api/users', users)
app.use('/api/query', query)
app.use('/api/register', register)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
const start = async () => {
  try {
    await connectMongoDB(process.env.CONN_STRING)
    app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`))
  } catch (error) {
    console.log(error)
  }
}
  
start()

