import { useState } from 'react'

const BlogForm = ({ blog }) => {
  const [loginVisible, setLoginVisible] = useState(false)
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={blog.blogHandler}>
          <div>
          title: <input value={blog.title} onChange={blog.titleController} />
            <br />
          author: <input value={blog.author} onChange={blog.authorController} />
            <br />
          url: <input value={blog.url} onChange={blog.urlController} />
            <br />
            <button onClick={() => setLoginVisible(false)} type="submit">create</button>
            <button onClick={() => setLoginVisible(false)}>cancel</button>
          </div>
          <br />
        </form>
      </div>

    </>
  )
}

export default BlogForm