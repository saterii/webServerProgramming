const jwt = require('jsonwebtoken')
const { APIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const authUser = async (req,res,next) => {
  const authHeader = req.headers.authorization
  if(!authHeader || !authHeader.startsWith('Bearer')) {
    console.log(req.headers)
    return res.status(StatusCodes.UNAUTHORIZED).send({ success : false, msg:`You must be logged in to use this route!`})
  }
  const token = authHeader.split(' ')[1]
  
  try {
    
    const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    const { id, username, role } = decoded
    req.user = { id, username, role }
    next()
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).send({ success : false, msg:`You must be logged in to use this route!`})
  }
}



module.exports =  authUser