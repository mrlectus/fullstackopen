import { useState } from 'react';
const Statistics = ({ good, bad, all, neutral }) => {
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{(good - bad) / all}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{(good / all) * 100}%</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + bad + neutral;

  return (
    <>
      <main className="flex flex-col gap-4 m-10">
        <h1 className="font-bold text-lg">give feedback</h1>
        <div className="flex gap-4 cursor-pointer">
          <button className="border p-2" onClick={() => setGood(good + 1)}>
            good
          </button>
          <button
            className="border p-2"
            onClick={() => setNeutral(neutral + 1)}
          >
            neutral
          </button>
          <button
            className="border p-2"
            onClick={() => setBad((prev) => prev + 1)}
          >
            bad
          </button>
        </div>
        <div>
          <h1 className="font-bold text-lg">statistics</h1>
          {all === 0 ? (
            <p>No feedback given</p>
          ) : (
            <Statistics all={all} good={good} bad={bad} neutral={neutral} />
          )}
        </div>
      </main>
    </>
  );
}

export default App;
