const auth = (req, res, next) => {
    const { user } = req.body
    if (!user){
        res.send("Unauthorized")
    }
    next()
  }

module.exports = auth