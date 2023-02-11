
const BlogForm = ({ blog }) => {
  // for testing
  // const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target
  //   setNewBlog({ ...newBlog, [name]: value })
  // }

  // const handleCreateBlog = (event) => {
  //   event.preventDefault()
  //   blog(newBlog.title, newBlog.author, newBlog.url)
  //   blog({ title: '', author: '', url: '' })
  // }

  // return (
  //   <>
  //     <form onSubmit={handleCreateBlog}>
  //       <div>
  //         title: <input type="text" name="title" value={newBlog.title} onChange={handleInputChange} />
  //         <br />
  //         author: <input type="text" name="author" value={newBlog.author} onChange={handleInputChange} />
  //         <br />
  //         url: <input type="text" name="url" value={newBlog.url} onChange={handleInputChange} />
  //         <br />
  //         <button type="submit">create</button>
  //       </div>
  //     </form>
  //   </>
  // )

  return (
    <>
      <form onSubmit={blog.blogHandler}>
        <div>
          title: <input id='title' value={blog.title} onChange={blog.titleController} />
          <br />
          author: <input id='author' value={blog.author} onChange={blog.authorController} />
          <br />
          url: <input id='url' value={blog.url} onChange={blog.urlController} />
          <br />
          <button id='blog-button' type="submit">create</button>
        </div>
      </form>
    </>
  )
}

export default BlogForm