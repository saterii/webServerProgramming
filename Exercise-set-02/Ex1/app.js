const express = require('express')
const app = express()

app.use(express.json())

let { albums } = require("./db.json")

app.get('/api/albums', (req,res)=>{
    res.status(200).json({success:true,data:albums})
})

app.get("/api/albums/:albumID", (req, res)=>{
    const { albumID } = req.params
    const singleAlbum = albums.find(
        (album) => album.id === Number(albumID)
      )
      if (!singleAlbum) {
        return res.status(404).send('Album not found!')
      }
      return res.json(singleAlbum)
})

app.post("/api/albums", (req, res)=>{
    const { title } = req.body
    const artist = req.body.artist
    const year = req.body.year
    const genre = req.body.genre
    const tracks = req.body.tracks
    if(!title){
        return res.status(400).json({success:false})
      }
    const maxID = Math.max(...albums.map(album => album.id), 0)
    const newID = (maxID + 1)
    const album = {
        id:newID,
        title,
        artist,
        year,
        genre,
        tracks,
      }
      albums = albums.concat(album)
      res.status(201).json({success:true,album:title})
})

app.put("/api/albums/:id", (req, res)=>{
    const { id } = req.params
    const artist = req.body.artist
    const year = req.body.year
    const genre = req.body.genre
    const tracks = req.body.tracks
    const album = albums.find((album) => album.id === Number(id))
    if (!album){
        return res
            .status(404)
            .json({ success: false, msg: `No album found with id ${id}` })
    }
    const newAlbums = albums.map((albums) => {
        if (album.id === Number(id)) {
          album.artist = artist,
          album.year = year,
          album.genre = genre,
          album.tracks = tracks
        }
        return album
      })
      res.status(200).json({ success: true, data: newAlbums })
})

app.delete('/api/albums/:id', (req, res) => {
    const { id } = req.params
    const album = albums.find((album) => album.id === Number(id))
    if (!album) {
      return res
        .status(404)
        .json({ success: false, msg: `No album found with id ${id}` })
    }
    const newAlbums = albums.filter(
      (album) => album.id !== Number(id)
    )
    albums = newAlbums
    return res.status(200).json({ success: true, data: albums })
  })

const PORT = 5001
    app.listen(PORT, ()=> {
    console.log(`server listening on port ${PORT}...`)
    })