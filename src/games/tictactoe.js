import React, { useState } from "react";
import "../games/tictactoe.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winningLine, setWinningLine] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [isSinglePlayer, setIsSinglePlayer] = useState(false); // Track if the game is in singleplayer mode
  const [isAITurn, setIsAITurn] = useState(false); // Track if it is the AI's turn

  const handleClick = (index) => {
    if (board[index] || winningLine || isDraw || isAITurn) {
      return; // Disable click if game is over (winner or draw) or if it's the AI's turn
    }
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const result = calculateWinner(newBoard);
    if (result) {
      setWinningLine(result.line); // Store winning line if there is a winner
    } else if (newBoard.every((square) => square !== null)) {
      setIsDraw(true); // Check if all squares are filled and no winner
    }

    if (
      isSinglePlayer &&
      !result &&
      !newBoard.every((square) => square !== null)
    ) {
      setIsAITurn(true); // Indicate that it's the AI's turn
      // Delay AI move for 500ms to simulate thinking
      setTimeout(() => {
        const aiMove = getSmartAIMove(newBoard);
        if (aiMove !== -1) {
          newBoard[aiMove] = "O";
          setBoard(newBoard);
          setIsXNext(true);
          const aiResult = calculateWinner(newBoard);
          if (aiResult) {
            setWinningLine(aiResult.line);
          } else if (newBoard.every((square) => square !== null)) {
            setIsDraw(true);
          }
        }
        setIsAITurn(false); // End AI turn
      }, 500); // 500ms delay
    }
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null)); // Reset the board
    setIsXNext(true); // Set the first player to 'X'
    setWinningLine(null); // Clear the winning line
    setIsDraw(false); // Reset the draw state
    setIsAITurn(false); // Ensure AI is not in turn state after restart
  };

  const handleModeChange = (mode) => {
    handleRestart(); // Reset the game when mode changes
    setIsSinglePlayer(mode === "singleplayer"); // Set mode
  };

  const renderSquare = (index) => {
    const isWinningSquare = winningLine && winningLine.includes(index);
    return (
      <button
        className={`square ${isWinningSquare ? "winning-square" : ""}`}
        onClick={() => handleClick(index)}
        disabled={isAITurn} // Disable click if AI is making a move
      >
        {board[index]}
      </button>
    );
  };

  // Determine who won based on the board and mode
  const winner = winningLine ? board[winningLine[0]] : null;
  const status = winner
    ? winner === "X"
      ? isSinglePlayer
        ? "User wins!"
        : "X wins!"
      : isSinglePlayer
      ? "AI wins!"
      : "O wins!"
    : isDraw
    ? "It's a Draw!"
    : `Next Player: ${isXNext ? "X" : "O"}`;
  return (
    <div className="tictactoe-container">
      <div className="mode-select">
        <button
          className={`mode-button ${isSinglePlayer ? "active" : ""}`}
          onClick={() => handleModeChange("singleplayer")}
        >
          Play versus AI
        </button>
        <button
          className={`mode-button ${!isSinglePlayer ? "active" : ""}`}
          onClick={() => handleModeChange("multiplayer")}
        >
          Pass and Play
        </button>
      </div>
      <div className="status">{status}</div>
      <div className="tictactoe-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <button className="restart-button" onClick={handleRestart}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="white"
          >
            <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
// Helper function to calculate the winner
const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: lines[i] }; // Return winner and winning line
    }
  }
  return null;
};

// Improved AI to make smarter moves
const getSmartAIMove = (board) => {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // 1. Try to win
  for (let line of winningLines) {
    const [a, b, c] = line;
    if (board[a] === "O" && board[a] === board[b] && board[c] === null)
      return c;
    if (board[a] === "O" && board[a] === board[c] && board[b] === null)
      return b;
    if (board[b] === "O" && board[b] === board[c] && board[a] === null)
      return a;
  }

  // 2. Block player from winning
  for (let line of winningLines) {
    const [a, b, c] = line;
    if (board[a] === "X" && board[a] === board[b] && board[c] === null)
      return c;
    if (board[a] === "X" && board[a] === board[c] && board[b] === null)
      return b;
    if (board[b] === "X" && board[b] === board[c] && board[a] === null)
      return a;
  }

  // 3. Take center if available
  if (board[4] === null) return 4;

  // 4. Take corners if available
  const corners = [0, 2, 6, 8];
  for (let corner of corners) {
    if (board[corner] === null) return corner;
  }

  // 5. Otherwise take any available spot
  const availableSquares = board
    .map((value, index) => (value === null ? index : null))
    .filter((value) => value !== null);

  return availableSquares.length > 0 ? availableSquares[0] : -1;
};

export default TicTacToe;
