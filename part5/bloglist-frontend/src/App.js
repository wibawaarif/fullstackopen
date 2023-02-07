import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const formHandler = (event) => {
    event.preventDefault();
    
    loginService.userLogin({
      username,
      password,
    })

  }

  const usernameController = (event) => {
    setUsername(event.target.value)
  }
  const passwordController = (event) => {
    setPassword(event.target.value)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

<form onSubmit={formHandler}>
        <div>
          username: <input onChange={usernameController} />
        </div>
        <div>
          password: <input onChange={passwordController} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default App