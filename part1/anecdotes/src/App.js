import React, { useState } from "react";
const MostVoted = ({ anecdotes, points }) => {
  if (points.reduce((a, b) => a + b) === 0) {
    return (
      <>
        <h1>Anecdote with most votes</h1>
        <p>No votes given</p>
      </>
    );
  } else {
    const max = points.indexOf(Math.max(...points));
    return (
      <>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[max]}</p>
      </>
    );
  }
};
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
  ];

  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0]);
  const [selected, setSelected] = useState(0);
  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };
  const vote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>{points[selected]}</p>
      <button onClick={randomAnecdote}>next anecdote</button>
      <button onClick={vote}>vote</button>

      <MostVoted anecdotes={anecdotes} points={points} />
    </div>
  );
};

export default App;
