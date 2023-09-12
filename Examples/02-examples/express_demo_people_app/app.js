const express = require('express')
const app = express()
// json parser middleware that takes the json data and assigns it to the requests body
// so that it can be accessed in the route handler
app.use(express.json())

let { people } = require('./data')

const logger = (req, res, next) => {
  console.log(req.query)
  const { search } = req.query
  if (!search) {
    return res.status(401).json({success:false})
  }
  next()
}

app.use(logger)

app.get('/api/people', (_req, res)=>{
  res.status(200).json({success:true,data:people})
})

app.post('/api/people', (req,res)=>{
  const name = req.body.name
  // alternative syntax
  // const {name} = req.body
  if(!name){
    return res.status(400).json({success:false})
  }
  // ID creation is for testing purposes only, this will be omitted when we convert to using databases
  const maxId = Math.max(...people.map(person => person.id), 0)
  const newID = (maxId+1)
  const person = {
    id:newID,
    name,
  }
  people = people.concat(person)
  res.status(201).json({success:true,person})
})

const PORT = 5001
app.listen(PORT, ()=> {
  console.log(`server listening on port ${PORT}...`)
})