const mongoose = require('mongoose')
const supertest = require('supertest')
const Vehicle = require('../models/Album')
const app = require('../app')
const api = supertest(app)

beforeAll(done => {
    done()
  })

test('database has x number of albums', async() => {
    await api
        .get("/api/albums")
        .then(response => {
            expect(response.body.albums).toHaveLength(22)
        })
})

test('album added to database', async () => {
    const initialResponse = await api.get('/api/albums')
    const initialAlbums = initialResponse.body.albums
    const newAlbum = {
        "artist": "TestArtist4",
        "title": "TestAlbum3",
        "year": 2004,
        "tracks": 8,
        "genre": "pop"
    }
  await api
    .post('/api/albums')
    .send(newAlbum)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/albums')
  expect(response.body.albums).toHaveLength(initialAlbums.length + 1)
})

test("album deleted from database", async() => {
    const initialResponse = await api.get('/api/albums')
    const initialAlbums = initialResponse.body.albums
    const deletedAlbumId = "6577156d32060aa216a65cbd"
    await api
        .delete("/api/albums/" + deletedAlbumId)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
    const response = await api.get('/api/albums')
    expect(response.body.albums).toHaveLength(initialAlbums.length -1)
})

afterAll(() => {
    mongoose.connection.close()
  })
  