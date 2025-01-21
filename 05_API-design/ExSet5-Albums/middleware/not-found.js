function notFoundMiddleware(req,res,next) {
  res.status(404).send('<h1>Route does not exist</h1>')
}

module.exports = notFoundMiddleware

  