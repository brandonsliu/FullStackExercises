import React from 'react';

const Course = ({course}) => {
    return (
      <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total parts={course.parts}/>
      </div>
    )
  }

  const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }

  const Content = ({ course }) => {
    return (
      <div>
          {course.parts.map(part => (
              <Part key={part.id} part={part}/>
          ))}
      </div>
    )
  }

  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }

  const Total = ({ parts }) => {
    const sum = parts.reduce((accumulator, item) => {
      return accumulator + item.exercises
    }, 0)
    return(
      <h3>Number of exercises {sum}</h3>
    ) 
  }

  export default Course