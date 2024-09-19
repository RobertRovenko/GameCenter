import React from "react";
import { Routes, Route, Link } from "react-router-dom"; // No need to import BrowserRouter again
import TicTacToe from "./games/tictactoe";
import RockPaperScissors from "./games/rockpaper";
import "./gameboardbackground.css"; // Import the CSS file for the background
import Navbar from "../src/components/Navbar.js"; // Import Navbar component

const App = () => {
  return (
    <div>
      <Navbar /> {/* Include Navbar component */}
      <div className="gameboard-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/rockpaperscissors" element={<RockPaperScissors />} />
        </Routes>
      </div>
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h2>GAMES</h2>
      <div className="game-buttons">
        <Link to="/tictactoe">
          <button className="game-button">Tic Tac Toe</button>
        </Link>
        <Link to="/rockpaperscissors">
          <button className="game-button">Rock Paper Scissors</button>
        </Link>
      </div>
    </div>
  );
};

export default App;
