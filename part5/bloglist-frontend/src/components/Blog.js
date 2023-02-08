import { useState } from 'react'
import blogService from '../services/blogs'
import '../index.css'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [blogDetail, setBlogDetail] = useState(false)
  const hideWhenDetail = { display: blogDetail ? 'none' : '' }
  const showWhenDetail = { display: blogDetail ? '' : 'none' }

  const increaseLike = async () => {
    blog.likes+=1
    await blogService.updateBlog(blog)
    const updatedBlog = [...blogs].sort((a, b) => b.likes - a.likes)
    setBlogs(updatedBlog)
  }

  const deleteBlog = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id)
      const getAll = await blogService.getAll()
      const updatedBlog = [...getAll].sort((a, b) => b.likes - a.likes)
      setBlogs(updatedBlog)
    }
  }
  return (
    <>
      <div className="blog-list" style={hideWhenDetail}>
        {blog.title} {blog.author} <button onClick={() => setBlogDetail(true)}>view</button>
      </div>
      <div className="blog-list" style={showWhenDetail}>
        {blog.title}  <button onClick={() => setBlogDetail(false)}>hide</button>
        <br/>
        {blog.url}
        <br/>
        {blog.likes} <button onClick={increaseLike}>like</button>
        <br/>
        {blog.author}
        <br/>
        <button onClick={deleteBlog}>delete</button>
      </div>
    </>
  )
}

export default Blog