const http = require('http')
const { readFileSync } = require('fs')

const root = readFileSync('./index.html')

const server = http.createServer((req, res) => {
  const url = req.url
  console.log(url)

  if (url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write(root)
    res.end()
  }
  else {
    res.writeHead(404, { 'content-type': 'text/html' })
    res.write('<h1>Not found</h1>')
    res.end()
  }
})
server.listen(5001)
