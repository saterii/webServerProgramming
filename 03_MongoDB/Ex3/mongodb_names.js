require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.CONN_STRING, {dbName: "peopledb"})

const personSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
},
{ collection : "People"})

const Person = mongoose.model('Person', personSchema ,"People")

if(typeof process.argv[2] === 'undefined' || typeof process.argv[3] === 'undefined' ) {
    Person.find({}).then(result => {
        result.forEach(person => {
        console.log(person)
        })
        mongoose.connection.close()
    })
}else{
    const person = new Person({
    firstname: process.argv[2],
    lastname: process.argv[3]
    })

    savePerson = person.save().then(result => {
        console.log('Person saved!')
    mongoose.connection.close()
    })
}
