let { people } = require('../data')

const getPeople = (_req, res)=>{
  res.status(200).json({success:true,data:people})
}

const createPerson = (req,res)=>{
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
}
module.exports = { getPeople, createPerson}