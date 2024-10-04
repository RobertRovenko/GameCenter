import React from "react";
import { Routes, Route, Link } from "react-router-dom"; // No need to import BrowserRouter again
import TicTacToe from "./games/tictactoe.js";
import RockPaperScissors from "./games/rockpaper.js";
import ConnectFour from "./games/connectfour.js";
import Navbar from "./components/Navbar.js"; // Import Navbar component
import "./app.css";

const App = () => {
  return (
    <div>
      <Navbar /> {/* Include Navbar component */}
      <div className="gameboard-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/rockpaperscissors" element={<RockPaperScissors />} />
          <Route path="/connectfour" element={<ConnectFour />} />
        </Routes>
      </div>
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h2 className="title-text">GAMES</h2>
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
