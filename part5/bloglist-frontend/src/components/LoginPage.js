import Notification from './Notification'

const LoginPage = (props) => {
  return (
    <>
      <h2>log in to application</h2>
      <Notification messages={props.notif.msg} showElement={props.notif.isValid} category={props.notif.category}/>
      <form onSubmit={props.formHandler}>
        <div>
          username: <input id='username' value={props.username} onChange={props.usernameController} />
        </div>
        <div>
          password: <input id='password' value={props.password} type="password" onChange={props.passwordController} />
        </div>
        <div>
          <button id='login-button' type="submit">login</button>
        </div>
      </form>
    </>
  )
}

export default LoginPage