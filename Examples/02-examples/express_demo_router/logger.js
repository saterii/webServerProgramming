const logger = (req, res, next) => {
  console.log(req.query)
  const { search } = req.query
  if (!search) {
    return res.status(401).json({success:false})
  }
  next()
}

module.exports = logger