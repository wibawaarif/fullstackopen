import Notification from './Notification'
import BlogForm from './BlogForm'
import Blog from './Blog'

const IndexPage = (props) => {

  const sendToForm = {
    blogHandler: props.blogHandler,
    title: props.title,
    titleController: props.titleController,
    author: props.author,
    authorController: props.authorController,
    url: props.url,
    urlController: props.urlController
  }
  return (
    <>
      <h2>blogs</h2>
      <Notification messages={props.notif.msg} showElement={props.notif.isValid} category={props.notif.category}/>
      <p>
        {localStorage.getItem('name')} logged in{' '}
        <button onClick={props.logout}>logout</button>
      </p>
      <BlogForm blog={sendToForm} />

      {props.blogs.map((blog, index) => (
        <Blog blogs={props.blogs} setBlogs={props.setBlogs} key={index} blog={blog} />
      ))}
    </>
  )
}

export default IndexPage