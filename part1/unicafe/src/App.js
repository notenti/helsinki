import { tab } from "@testing-library/user-event/dist/tab";
import React, { useState } from "react";

const Display = ({ text }) => <h1>{text}</h1>;

const Button = ({ clickHandler, text }) => (
  <button onClick={clickHandler}>{text}</button>
);

const Content = ({ quality, count }) => (
  <tr>
    <td>{quality}</td>
    <td>{count}</td>
  </tr>
);

const Statistics = ({ goodCount, neutralCount, badCount }) => {
  if (goodCount + neutralCount + badCount === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <div>
      <table>
        <tbody>
          <Content quality={"good"} count={goodCount} />
          <Content quality={"neutral"} count={neutralCount} />
          <Content quality={"bad"} count={badCount} />
          <Content
            quality={"all"}
            count={goodCount + badCount + neutralCount}
          />
          <Content
            quality={"average"}
            count={
              (goodCount - badCount) / (goodCount + badCount + neutralCount)
            }
          />
          <Content
            quality={"positive"}
            count={(goodCount / (goodCount + badCount + neutralCount)) * 100}
          />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [goodCount, setGood] = useState(0);
  const [neutralCount, setNeutral] = useState(0);
  const [badCount, setBad] = useState(0);

  const incrementCount = (toIncrement, incrementer) => () =>
    incrementer(toIncrement + 1);

  return (
    <div>
      <Display text="give feedback" />
      <Button clickHandler={incrementCount(goodCount, setGood)} text={"good"} />
      <Button
        clickHandler={incrementCount(neutralCount, setNeutral)}
        text={"neutral"}
      />
      <Button clickHandler={incrementCount(badCount, setBad)} text={"bad"} />
      <Display text="statistics" />
      <Statistics
        goodCount={goodCount}
        neutralCount={neutralCount}
        badCount={badCount}
      />
    </div>
  );
};

export default App;
