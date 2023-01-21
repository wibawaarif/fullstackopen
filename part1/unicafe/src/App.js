import { useState } from "react";

const Title = ({ title }) => <h1>{title}</h1>;

const Button = ({ count, text }) => <button onClick={count}>{text}</button>;

const ButtonRating = ({ feedback }) => {
  return (
    <>
      <Button count={feedback.goodFeedback} text="good" />
      <Button count={feedback.neutralFeedback} text="neutral" />
      <Button count={feedback.badFeedback} text="bad" />
    </>
  );
};

const StatisticLine = ({ rating, text, format }) => {
  if (format) {
    return (
      <tr>
        <td>{text}</td>
        <td>{rating} %</td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{text}</td>
      <td>{rating}</td>
    </tr>
  );
};

const Statistics = ({ rating }) => {
  if (
    rating.good === 0 &&
    rating.neutral === 0 &&
    rating.bad === 0
  ) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <table>
        <tbody>
          <StatisticLine rating={rating.good} text="good" />
          <StatisticLine rating={rating.neutral} text="neutral" />
          <StatisticLine rating={rating.bad} text="bad" />
          <StatisticLine rating={rating.all} text="all" />
          <StatisticLine rating={rating.average} text="average" />
          <StatisticLine rating={rating.positive} text="positive" format="%" />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodFeedback = () => setGood(good + 1);
  const neutralFeedback = () => setNeutral(neutral + 1);
  const badFeedback = () => setBad(bad + 1);

  const totalRating = good + neutral + bad;

  const feedback = {
    goodFeedback,
    neutralFeedback,
    badFeedback,
  };

  const rating = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: totalRating,
    average: ((good - bad) / totalRating).toFixed(1),
    positive: ((good / totalRating) * 100).toFixed(1),
  };

  return (
    <div>
      <Title title="give feedback" />
      <ButtonRating feedback={feedback} />
      <Title title="statistics" />
      <Statistics rating={rating} />
    </div>
  );
};

export default App;
