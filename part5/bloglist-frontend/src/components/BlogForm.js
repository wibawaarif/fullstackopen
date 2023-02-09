
const BlogForm = ({ blog }) => {

  return (
    <>
      <form onSubmit={blog.blogHandler}>
        <div>
          title: <input value={blog.title} onChange={blog.titleController} />
          <br />
          author: <input value={blog.author} onChange={blog.authorController} />
          <br />
          url: <input value={blog.url} onChange={blog.urlController} />
          <br />
          <button type="submit">create</button>
        </div>
      </form>
    </>
  )
}

export default BlogForm