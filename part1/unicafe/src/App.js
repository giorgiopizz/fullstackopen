import React, { useState } from "react";

const Header = () => {
  return <h1>give feedback</h1>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};
const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
const Statistics = ({ data }) => {
  if (data.reduce((a, b) => a + b) === 0) {
    return <p>No feedback given</p>;
  } else {
    const avg = (data[0] - data[2]) / data.reduce((a, b) => a + b);
    const pst = data[0] / data.reduce((a, b) => a + b);
    return (
      <table>
        <tbody>
          <Statistic text="good" value={data[0]} />
          <Statistic text="neutral" value={data[1]} />
          <Statistic text="bad" value={data[2]} />
          <Statistic text="all" value={data.reduce((a, b) => a + b)} />
          <Statistic text="average" value={avg} />
          <Statistic text="positive" value={pst * 100 + "%"} />
        </tbody>
      </table>
    );
  }
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const goodHandle = () => {
    setGood(good + 1);
  };
  const neutralHandle = () => {
    setNeutral(neutral + 1);
  };
  const badHandle = () => {
    setBad(bad + 1);
  };
  const statistics = [good, neutral, bad];
  return (
    <div>
      <Header />
      <Button handleClick={goodHandle} text="Good" />
      <Button handleClick={neutralHandle} text="Neutral" />
      <Button handleClick={badHandle} text="Bad" />
      <Statistics data={statistics} />
    </div>
  );
};

export default App;
