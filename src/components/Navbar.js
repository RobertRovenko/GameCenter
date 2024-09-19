// src/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "../components/Navbar.css"; // Import CSS for Navbar styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/tictactoe" className="navbar-link">
            TicTacToe
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/rockpaperscissors" className="navbar-link">
            Rock Paper Scissors
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
