const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <>
    <p>
      {props.part1} {props.excercise1}
    </p>
    <p>
    {props.part2} {props.excercise2}
      </p>
      <p>
      {props.part3} {props.excercise3}
      </p>
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
   <>
    <Header course={course} />
    <Content excercise1={exercises1} part1={part1} exercises2={exercises2} part2={part2} exercises3={exercises3} part3={part3} />
    <Total total={exercises1 + exercises2 + exercises3} />
   </>
  )
}


export default App;
