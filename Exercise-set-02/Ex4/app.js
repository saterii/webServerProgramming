const express = require('express')
const app = express()
app.use(express.json())
const albums = require('./routes/albums')
app.use(express.static('./public'))
app.use("/api/albums", albums)
app.use(express.static(__dirname));
const PORT = 5001
    app.listen(PORT, ()=> {
    console.log(`server listening on port ${PORT}...`)
    })