const express = require('express')
const app = express()
// json parser middleware that takes the json data and assigns it to the requests body
// so that it can be accessed in the route handler
app.use(express.json())

const peopleRouter = require('./routes/people')
const logger = require('./middleware/logger')

app.use(logger)
app.use('/api/people', peopleRouter)

const PORT = 5001
app.listen(PORT, ()=> {
  console.log(`server listening on port ${PORT}...`)
})