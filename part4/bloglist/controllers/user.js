const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')


usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (password.length < 3) {
    return res.status(400).send({
      error: "Password must be at least 3 characters"
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs' ,{ title: 1, author: 1, url: 1 })
  return res.json(users)
})


module.exports = usersRouter
