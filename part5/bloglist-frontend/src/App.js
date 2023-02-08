import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginPage from './components/LoginPage'
import IndexPage from './components/IndexPage'

import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notifColor, setNotifColor] = useState('')
  const [showElement,setShowElement] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const formHandler = async (event) => {
    event.preventDefault()

    const user = await loginService.userLogin({
      username,
      password,
    })

    if (user?.response?.data?.error) {
      setErrorMessage('wrong username or password')
      setNotifColor('failed')
      setShowElement(true)
      setTimeout(() => {
        setShowElement(false)
      }, 3000)
      setUsername('')
      setPassword('')
      return
    }
    localStorage.setItem('name', user.name)
    localStorage.setItem('token', user.token)
    window.location.reload()
  }

  const blogHandler = async (event) => {
    event.preventDefault()

    const newBlogs = await blogService.postBlog({
      title,
      url,
      author,
    })

    if (newBlogs) {
      const newPost = [...blogs, {
        title: newBlogs.title,
        url: newBlogs.url,
        author: newBlogs.author,
        likes: newBlogs.likes
      }]
      setBlogs(newPost)
      setErrorMessage(`a blog ${newBlogs.title} by ${newBlogs.author}`)
      setNotifColor('success')
      setShowElement(true)
      setTimeout(() => {
        setShowElement(false)
      }, 3000)
    }
    setAuthor('')
    setUrl('')
    setTitle('')
  }

  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }

  const sendNotification = {
    msg: errorMessage,
    isValid: showElement,
    category: notifColor
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  return (
    <div>
      {localStorage.getItem('token') ? (
        <IndexPage
          urlController={(event) => setUrl(event.target.value)}
          titleController={(event) => setTitle(event.target.value)}
          authorController={(event) => setAuthor(event.target.value)}
          blogHandler={blogHandler}
          logout={logout}
          blogs={blogs}
          setBlogs={setBlogs}
          notif={sendNotification}
          url={url}
          author={author}
          title={title}
        />
      ) : (
        <LoginPage
          formHandler={formHandler}
          usernameController={(event) => setUsername(event.target.value)}
          passwordController={(event) => setPassword(event.target.value)}
          notif={sendNotification}
          username={username}
          password={password}
        />
      )}
    </div>
  )
}

export default App
