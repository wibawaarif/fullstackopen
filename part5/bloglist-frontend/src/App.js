import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import './index.css'

const LoginPage = (props) => {
  return (
    <>
      <h2>log in to application</h2>
      <Notification messages={props.notif.msg} showElement={props.notif.isValid} category={props.notif.category}/>
      <form onSubmit={props.formHandler}>
        <div>
          username: <input value={props.username} onChange={props.usernameController} />
        </div>
        <div>
          password: <input value={props.password} type="password" onChange={props.passwordController} />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </>
  );
};

const Notification = ({ messages, showElement, category }) => showElement ? <p className={category}>{messages}</p> : <></> 

const IndexPage = (props) => {
  return (
    <>
      <h2>blogs</h2>
      <Notification messages={props.notif.msg} showElement={props.notif.isValid} category={props.notif.category}/>
      <p>
        {localStorage.getItem("name")} logged in{" "}
        <button onClick={props.logout}>logout</button>
      </p>
      <form onSubmit={props.blogHandler}>
        <div>
          title: <input value={props.title} onChange={props.titleController} />
          <br />
          author: <input value={props.author} onChange={props.authorController} />
          <br />
          url: <input value={props.url} onChange={props.urlController} />
          <br />
          <button type="submit">create</button>
        </div>
        <br />
      </form>
      {props.blogs.map((blog, index) => (
        <Blog key={index} blog={blog} />
      ))}
    </>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [notifColor, setNotifColor] = useState("")
  const [showElement,setShowElement] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const formHandler = async (event) => {
    event.preventDefault();

    const user = await loginService.userLogin({
      username,
      password,
    });

    if (user?.response?.data?.error) {
      setErrorMessage('wrong username or password')
      setNotifColor('failed')
      setShowElement(true)
      setTimeout(() => {
        setShowElement(false)
      }, 3000)
      setUsername("");
      setPassword("");
      return
    }
    localStorage.setItem("name", user.name);
    localStorage.setItem("token", user.token);
  };

  const blogHandler = async (event) => {
    event.preventDefault();

    const newBlogs = await blogService.postBlog({
      title,
      url,
      author,
    });

    if (newBlogs) {
      const newPost = [...blogs, {
        title: newBlogs.title,
        url: newBlogs.url,
        author: newBlogs.author
      }]
      setBlogs(newPost)
      setErrorMessage(`a blog ${newBlogs.title} by ${newBlogs.author}`)
      setNotifColor('success')
      setShowElement(true)
      setTimeout(() => {
        setShowElement(false)
      }, 3000)
    }
    setAuthor("");
    setUrl("");
    setTitle("");
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const titleController = (event) => {
    setTitle(event.target.value);
  };
  const authorController = (event) => {
    setAuthor(event.target.value);
  };
  const urlController = (event) => {
    setUrl(event.target.value);
  };

  const usernameController = (event) => {
    setUsername(event.target.value);
  };
  const passwordController = (event) => {
    setPassword(event.target.value);
  };

  const sendNotification = {
    msg: errorMessage,
    isValid: showElement,
    category: notifColor
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      {localStorage.getItem("token") ? (
        <IndexPage
          urlController={urlController}
          titleController={titleController}
          authorController={authorController}
          blogHandler={blogHandler}
          logout={logout}
          blogs={blogs}
          notif={sendNotification}
          url={url}
          author={author}
          title={title}
        />
      ) : (
        <LoginPage
          formHandler={formHandler}
          usernameController={usernameController}
          passwordController={passwordController}
          notif={sendNotification}
          username={username}
          password={password}
        />
      )}
    </div>
  );
};

export default App;
