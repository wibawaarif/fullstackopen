const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

    return res.status(200).send(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blogs = await Blog.findById(req.params.id)

  if (!blogs) {
    return res.status(400).send({
      error: "Can't find the id"
    })
  }

  return res.status(200).send(blogs)
})

blogsRouter.delete('/:id', async (req,res) => {
  const token = req.token;
  const user = req.user;

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!(decodedToken.id && token)) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blogs = await Blog.findById(req.params.id)

  if (!blogs) {
    return res.status(400).send({
      error: "Can't find the id"
    })
  }

  if (blogs.user.toString() !== user.id.toString()) {
    return res.status(400).send({
      error: "Not authorize to delete this blog"
    })
  }

  await blogs.remove()

  await user.updateOne({
    $pull: {
      blogs: blogs.id
    }
  })
  
  return res.status(204).send({
    info: "Success deleted blog"
  })

})

blogsRouter.post('/', async (req, res) => {
  if (!req.body.url || !req.body.title) {
    return res.status(400).send({
      error: "url and title can't be empty"
    })
  }
  const body = req.body;
  const user = req.user;
  const token = req.token;

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!(decodedToken.id && token)) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const newBlog = Object.assign(req.body, {
    user: user._id
  })

  const blog = new Blog(newBlog)

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return res.status(201).send(savedBlog)
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  })

  return res.status(200).send({
    info: "Successfully updated"
  })

})

module.exports = blogsRouter
