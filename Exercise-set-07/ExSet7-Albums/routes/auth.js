const router = require('express').Router()
const User = require('../models/User')

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  if (!user || user.password !== password) {
    res.status(401).send('Invalid username or password')
  } else {
    req.session.user = user // Set session data upon successful login
    res.send('Login successful!')
  }
})

router.post('/logout', (req, res) => {
  req.session.destroy() // Destroy session data upon logout
  res.send('Logout successful!')
})

module.exports = router