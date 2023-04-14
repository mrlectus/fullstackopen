import './App.css';

const Header = ({ name }) => (
  <h1>
    <b>{name}</b>
  </h1>
);

const Course = ({ courses }) => {
  return (
    <>
      <div>
        <h1>
          <b>Web development curriculum</b>
        </h1>
        {courses.map((course) => {
          const { name, parts, id } = course;
          const total = parts.reduce((x, y) => x + y.exercises, 0);
          return (
            <>
              <div key={id}>
                <Header name={name} />
                {parts.map((part) => {
                  const { name, exercises, id } = part;
                  return (
                    <>
                      <div key={id}>
                        <p>
                          {name} {exercises}
                        </p>
                      </div>
                    </>
                  );
                })}
                <p>
                  <b>total of {total} exercises</b>
                </p>
              </div>
            </>
          );
        })}
      </div>
      <p></p>
    </>
  );
};

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  return <Course courses={courses} />;
};

export default App;
