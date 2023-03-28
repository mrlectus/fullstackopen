import { nanoid } from 'nanoid';

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Parts = ({ parts }) => {
  return parts.map((part) => {
    return (
      <p key={nanoid()}>
        {part.name} {part.exercises}
      </p>
    );
  });
};

const Content = ({ parts }) => {
  return (
    <>
      <Parts parts={parts} />
    </>
  );
};

const Total = ({ parts }) => {
  const sum = parts.reduce((acc, curr) => acc + curr.exercises, 0);
  return <p>Number of exercises {sum}</p>;
};

function App() {
  const course = 'Half Stack application development';
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14,
    },
  ];
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
}

export default App;
