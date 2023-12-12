const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const { CustomError, APIError } = require('../errors')

const createUser = async (req, res) => {
  try {
    const { username, name, password, email, role } = req.body;
    console.log(`Received role: ${role}`);

    const userExists = await User.findOne({ username });

    if (userExists) {
      throw new ConflictError(`User already exists: ${username}`, StatusCodes.CONFLICT);
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
      email,
      role: role || 'regular',
    });

    await user.save();
    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: error.message });
  }
};

module.exports = {
  createUser
}