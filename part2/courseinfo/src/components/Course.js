const Header = ({header}) => <h2>{header}</h2>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Total =  ({total}) => <h3>total of {total} exercises</h3>

const Content = (props) => {
  return (
    <>
    {props.course.map(item => {
      const total = item.parts.reduce((sum, {exercises}) => sum + exercises, 0)
      console.log(total);
      return (
        <>
        <Header header={item.name} />
        {item.parts.map(x => <Part key={x.id} name={x.name} exercises={x.exercises} />)}
        <Total total={total} />
        </>
      )
    })}
    
    </>
  )
}

const Course = ({course}) => {

  return (
    <>
      <h1>Web development curriculum</h1>
      <Content course={course} />
    </>
  )
}

export default Course