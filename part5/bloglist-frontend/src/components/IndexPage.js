import Notification from './Notification'
import BlogForm from './BlogForm'
import Blog from './Blog'
import Togglable from './Togglable'
import { useRef, useState } from 'react'
import blogService from '../services/blogs'

const IndexPage = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogHandler = async (event) => {
    event.preventDefault()
    const newBlogs = await blogService.postBlog({
      title,
      url,
      author,
    })
    console.log(newBlogs)
    if (newBlogs) {
      blogFormRef.current.toggleVisibility()
      const newPost = [...props.blogs, {
        title: newBlogs.title,
        url: newBlogs.url,
        author: newBlogs.author,
        likes: newBlogs.likes,
        id: newBlogs.id
      }]
      props.setBlogs(newPost)
      props.setErrorMessage(`a blog ${newBlogs.title} by ${newBlogs.author}`)
      props.setNotifColor('success')
      props.setShowElement(true)
      setTimeout(() => {
        props.setShowElement(false)
      }, 3000)
    }
    setAuthor('')
    setUrl('')
    setTitle('')
  }

  const sendToForm = {
    blogHandler,
    title,
    titleController: (event) => setTitle(event.target.value),
    author,
    authorController: (event) => setAuthor(event.target.value),
    url,
    urlController: (event) => setUrl(event.target.value)
  }

  const blogFormRef = useRef()

  return (
    <>
      <h2>blogs</h2>
      <Notification messages={props.notif.msg} showElement={props.notif.isValid} category={props.notif.category}/>
      <p>
        {localStorage.getItem('name')} logged in{' '}
        <button onClick={props.logout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm blog={sendToForm} />
      </Togglable>
      {props.blogs.map((blog, index) => (
        <Blog blogs={props.blogs} setBlogs={props.setBlogs} key={index} blog={blog} />
      ))}
    </>
  )
}

export default IndexPage