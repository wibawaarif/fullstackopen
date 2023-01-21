import { useState } from "react";

const Title = ({ text }) => <h1>{text}</h1>;

const Content = ({ anecdotes, votes }) => {
  return (
    <>
      <p>{anecdotes}</p>
      <p>has {votes} votes</p>
    </>
  );
};

const Button = ({ type, text }) => <button onClick={type}>{text}</button>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

  const randomAnecdote = () => {
    const randomize = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomize);
  };

  const voteAnecdote = () => {
    const newVote = [...votes];
    newVote[selected] += 1;
    setVotes(newVote);
  };
  const highestIndex = votes.indexOf(Math.max(...votes));

  const content = {
    anecdotes: anecdotes[selected],
    votes: votes[selected],
    highestAnecdotes: anecdotes[highestIndex],
    highestVotes: votes[highestIndex],
  };

  return (
    <div>
      <Title text="Anecdote of the day" />
      <Content anecdotes={content.anecdotes} votes={content.votes} />
      <Button type={voteAnecdote} text="vote" />
      <Button type={randomAnecdote} text="next anecdote" />
      <Title text="Anecdote with most votes" />
      <Content
        anecdotes={content.highestAnecdotes}
        votes={content.highestVotes}
      />
    </div>
  );
};

export default App;
