const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const { CustomError, APIError } = require('../errors')

const createUser = async (req,res, next) => {
  try{
    const { username, name, password, passwordConfirmation, email } = req.body
    const userExists = await User.findOne({ username })
    const emailExists = await User.findOne({ email })
    
    if (!username || !name || !password || !passwordConfirmation || !email){
      throw new CustomError("All fields required!", StatusCodes.NOT_ACCEPTABLE)
    }
    if (userExists) {
      throw new CustomError(`User already exists: ${username}`, StatusCodes.CONFLICT)
    }
    
    if (emailExists){
      throw new CustomError(`User with email ${email} already exists.`, StatusCodes.CONFLICT)
    }
    if (password != passwordConfirmation){
      throw new CustomError("Password must match the confirmation!", StatusCodes.NOT_ACCEPTABLE)
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      username,
      name,
      passwordHash,
      email,
    })

    await user.save()
    res.status(StatusCodes.CREATED).json({ user })
  }catch(err){next(err)}
}


module.exports = {
  createUser
}