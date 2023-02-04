const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { blogsInDb, initialBlogs } = require('./blog_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('when there is initially some notes saved', () => {

  test('notes are returned as json', async () => {
    const response = 
      await api.get('/api/blogs')
        .expect(200)
        .expect("Content-Type", /application\/json/);
    })
    
  test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')
    
      expect(response.body).toHaveLength(initialBlogs.length)
    })
})

describe('addition of a new note', () => {

  test("successfully create a new blog post", async () => {
    const newBlog = {
      title: "Design Pattern",
      author: "Neyl",
      url: "www.neyl.com",
      likes: 10
    }
  
    await api.post("/api/blogs").send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain(
      'Design Pattern'
    )
  });
  
  test("check if likes property is missing", async () => {
    const newBlog = {
      title: "Design Pattern",
      author: "Neyl",
      url: "www.neyl.com",
    }
  
    await api.post("/api/blogs").send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  
    const lastBlog = await blogsInDb();
  
    expect(lastBlog).toHaveLength(initialBlogs.length + 1)
    expect(lastBlog[lastBlog.length - 1].likes).toBe(0)
  });
  
  test("check if title or url property is missing and returned 400", async () => {
    const newBlog = {
      likes: 5
    }
  
    await api.post("/api/blogs").send(newBlog).expect(400).expect('Content-Type', /application\/json/)
  
  
    const lastBlog= await blogsInDb();
    expect(lastBlog).toHaveLength(initialBlogs.length);
  
  });
})


describe('viewing a specific blog', () => {
  test("blogs have id property named id", async () => {
    const response = await api.get("/api/blogs");
  
    const allId = response.body.map((blog) => blog.id);
  
    for (const id of allId) {
      expect(id).toBeDefined();
    }
  });

  test('fails with status code 404 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})


describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogAtStart = await blogsInDb()
    const blogToDelete = blogAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      initialBlogs.length - 1
    )

    const contents = blogsAtEnd.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})


describe('update a blog', () => {
  test('succeeds update with status code 200', async () => {
    const blogAtStart = await blogsInDb()
    const blogToDelete = blogAtStart[0]

    const updatedBlog = {
      likes: 12
    }

    await api
      .put(`/api/blogs/${blogToDelete.id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd[0].likes).toBe(12)
  })


})




afterAll(async () => {
  await mongoose.connection.close()
})