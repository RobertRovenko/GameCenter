import React, { useState } from "react";
import "./rockpaper.css";

const RockPaperScissors = () => {
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");

  const choices = ["Rock", "Paper", "Scissors"];

  const handleUserChoice = (choice) => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(choice);
    setComputerChoice(randomChoice);
    setResult(determineWinner(choice, randomChoice));
  };

  const determineWinner = (user, computer) => {
    if (user === computer) return "It's a draw!";
    if (
      (user === "Rock" && computer === "Scissors") ||
      (user === "Paper" && computer === "Rock") ||
      (user === "Scissors" && computer === "Paper")
    ) {
      return "You win!";
    } else {
      return "Computer wins!";
    }
  };

  return (
    <div className="game-container">
      <h1>Rock, Paper, Scissors</h1>
      <div className="choices">
        {choices.map((choice) => (
          <button key={choice} onClick={() => handleUserChoice(choice)}>
            {choice}
          </button>
        ))}
      </div>
      <div className="results">
        <p>Your choice: {userChoice}</p>
        <p>Computer's choice: {computerChoice}</p>
        <p>Result: {result}</p>
      </div>
    </div>
  );
};

export default RockPaperScissors;
