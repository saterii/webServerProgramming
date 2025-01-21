const Album = require('../models/Album');
const { APIError, CustomError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const createAlbum = async (req, res) => {
  console.log(req.user.id);
  try {
    const { title, artist, year, tracks, genre } = req.body;
    const ownerId = req.user.id;
    
    
    if (req.user.role === 'admin' || req.user.role === 'regular') {
      const newAlbum = new Album({ artist, title, year, genre, tracks, ownerId });
      const savedAlbum = await newAlbum.save();
      return res.status(StatusCodes.CREATED).json({ album: savedAlbum });
    } else {
      return res.status(StatusCodes.FORBIDDEN).send('Access Denied');
    }
  } catch (error) {
    console.error(error); 
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
  }
};


const deleteAlbum = async (req, res) => {
  try {
    const albumId = req.params.id;
    const album = await Album.findById(albumId);

    if (!album) {
      return res.status(StatusCodes.NOT_FOUND).send('Album not found');
    }

    
    if (req.user.role === 'admin' || (req.user.role === 'regular' && album.ownerId.toString() === req.user._id.toString())) {
      const deletedAlbum = await Album.findByIdAndDelete(albumId);
      return res.status(StatusCodes.OK).send('Album deleted successfully');
    } else {
      return res.status(StatusCodes.FORBIDDEN).send('Access Denied');
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
  }
};

const updateAlbum = async (req, res) => {
  const { id } = req.params;
  const { artist, title, year, genre, tracks } = req.body;
  try {
    const album = await Album.findById(id);
    if (!album) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, msg: `No album found with id ${id}` });
    }

    
    if (req.user.role === 'admin' || (req.user.role === 'regular' && album.ownerId.toString() === req.user._id.toString())) {
      if (artist) { album.artist = artist; }
      if (title) { album.title = title; }
      if (year) { album.year = year; }
      if (genre) { album.genre = genre; }
      if (tracks) { album.tracks = tracks; }

      const updatedAlbum = await album.save();
      return res.status(StatusCodes.OK).json({ success: true, data: updatedAlbum });
    } else {
      return res.status(StatusCodes.FORBIDDEN).send('Access Denied');
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(StatusCodes.BAD_REQUEST).send(errors);
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, msg: error.message });
  }
};

const getAlbum = async (req, res) => {
  const { id } = req.params;
  try {
    const album = await Album.findById(id);
    if (!album) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, msg: `No album found with id ${id}` });
    }
    return res.status(StatusCodes.OK).json({ success: true, data: album });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, msg: err.message });
  }
};

const getAlbums = async (req, res) => {
  const { sort, year, fields, artist, title } = req.query;
  const queryObject = {};

  if (artist) {
    queryObject.artist = { $regex: artist, $options: "i" };
  }
  if (title) {
    queryObject.title = { $regex: title, $options: "i" };
  }

  if (year) { queryObject.year = year; }
  let result = Album.find(queryObject);

  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  }
  if (fields) {
    const filters = fields.split(",");
    result = result.select(filters);
  }
  const albums = await result;
  res.status(StatusCodes.OK).json({ albums, nbHits: albums.length });
};

module.exports = {
  createAlbum,
  deleteAlbum,
  updateAlbum,
  getAlbums,
  getAlbum
};