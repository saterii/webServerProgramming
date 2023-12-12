const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');
const { APIError, NotFoundError, ConflictError } = require('../errors');

const getUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      throw new APIError('Access Denied', StatusCodes.FORBIDDEN);
    }

    const users = await User.find({}).select('name albums').populate('albums', { artist: 1, title: 1 });
    res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, name, password, email, role } = req.body;

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

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      throw new NotFoundError('No such user', StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: error.message });
  }
};

module.exports = {
  getUsers,
  createUser,
  getSingleUser,
};