const peopleRouter = require('express').Router()

const {
  getPeople,
  createPerson
} = require('../controller/people')

peopleRouter.route('/').get(getPeople).post(createPerson)
module.exports = peopleRouter
