const express = require('express')
const app = express()
app.use(express.json())
const albums = require('./routes/albums')

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

const PORT = 5001
    app.listen(PORT, ()=> {
    console.log(`server listening on port ${PORT}...`)
    })