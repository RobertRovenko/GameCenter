import React, { useState } from "react";
import "./connectfour.css";

const ConnectFour = () => {
  const ROWS = 6;
  const COLS = 7;

  const [board, setBoard] = useState(Array(ROWS).fill(Array(COLS).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState("Red");
  const [winner, setWinner] = useState(null);

  // Handle placing a piece in a column
  const handleDrop = (colIndex) => {
    if (winner) return; // Stop if the game is won

    const newBoard = board.map((row) => [...row]); // Clone the board
    for (let rowIndex = ROWS - 1; rowIndex >= 0; rowIndex--) {
      if (!newBoard[rowIndex][colIndex]) {
        newBoard[rowIndex][colIndex] = currentPlayer;
        setBoard(newBoard);
        checkWinner(newBoard, rowIndex, colIndex);
        setCurrentPlayer(currentPlayer === "Red" ? "Yellow" : "Red");
        break;
      }
    }
  };

  const handleHover = (event) => {
    // Change hover class based on the current player's turn
    const hoverClass = currentPlayer === "Red" ? "hover-red" : "hover-yellow";
    event.target.classList.add(hoverClass);
  };

  const handleHoverOut = (event) => {
    // Remove hover class when not hovering
    event.target.classList.remove("hover-red", "hover-yellow");
  };

  const checkWinner = (newBoard, row, col) => {
    const directions = [
      { x: 0, y: 1 }, // Vertical
      { x: 1, y: 0 }, // Horizontal
      { x: 1, y: 1 }, // Diagonal (down-right)
      { x: 1, y: -1 }, // Diagonal (up-right)
    ];

    const checkDirection = (dirX, dirY) => {
      let count = 0;
      let x = row,
        y = col;

      while (
        x >= 0 &&
        x < ROWS &&
        y >= 0 &&
        y < COLS &&
        newBoard[x][y] === currentPlayer
      ) {
        count++;
        x += dirX;
        y += dirY;
      }

      x = row - dirX;
      y = col - dirY;
      while (
        x >= 0 &&
        x < ROWS &&
        y >= 0 &&
        y < COLS &&
        newBoard[x][y] === currentPlayer
      ) {
        count++;
        x -= dirX;
        y -= dirY;
      }

      return count >= 4;
    };

    if (directions.some((dir) => checkDirection(dir.x, dir.y))) {
      setWinner(currentPlayer);
    }
  };

  const resetGame = () => {
    setBoard(Array(ROWS).fill(Array(COLS).fill(null)));
    setCurrentPlayer("Red");
    setWinner(null);
  };

  return (
    <div className="connect-four">
      <h2>Connect Four</h2>
      {winner ? (
        <h3>{winner} Wins!</h3>
      ) : (
        <h3>Current Player: {currentPlayer}</h3>
      )}
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${cell ? cell.toLowerCase() : ""}`}
                onClick={() => handleDrop(colIndex)}
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverOut}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={resetGame} className="reset-button">
        Reset Game
      </button>
    </div>
  );
};

export default ConnectFour;
