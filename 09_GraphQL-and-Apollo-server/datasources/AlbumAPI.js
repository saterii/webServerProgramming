const mongoose = require('mongoose');
require("dotenv").config();
const albumSchema = new mongoose.Schema({
  artist: String,
  title: String,
  year: Number,
  genre: String
});

const Album = mongoose.model('Album', albumSchema);

class AlbumAPI {
  constructor() {
    mongoose.connect(process.env.CONN_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.db = mongoose.connection;
    this.db.on('error', console.error.bind(console, 'connection error:'));
    this.db.once('open', () => {
      console.log('Connected to MongoDB');
    });
  }

  async getAlbums() {
    try {
      const albums = await Album.find({});
      return albums;
    } catch (error) {
      console.error('Error fetching albums:', error);
      return [];
    }
  }

  async removeAlbum(albumId) {
    try {
      const result = await Album.deleteOne({ _id: albumId });
      return result.deletedCount === 1;
    } catch (error) {
      console.error('Error removing album:', error);
      return false;
    }
  }
}

module.exports = AlbumAPI;