import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/Navbar.css"; // Import CSS for Navbar styling

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleMenu = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleNavClick = () => {
    setIsCollapsed(true); // Close the menu when navigating
  };

  return (
    <nav className="navbar">
      {/* Hamburger icon */}
      {isCollapsed && (
        <button className="navbar-toggle hamburger" onClick={toggleMenu}>
          ☰
        </button>
      )}

      {/* X icon, always visible when the menu is expanded */}
      {!isCollapsed && (
        <button className="navbar-toggle x-icon" onClick={toggleMenu}>
          ✖
        </button>
      )}

      <ul className={`navbar-menu ${!isCollapsed ? "show" : ""}`}>
        <li className="navbar-item">
          <Link to="/" className="navbar-link" onClick={handleNavClick}>
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/snake" className="navbar-link" onClick={handleNavClick}>
            Snake
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            to="/connectfour"
            className="navbar-link"
            onClick={handleNavClick}
          >
            Connect Four
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            to="/tictactoe"
            className="navbar-link"
            onClick={handleNavClick}
          >
            Tic Tac Toe
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            to="/rockpaperscissors"
            className="navbar-link"
            onClick={handleNavClick}
          >
            Rock Paper Scissors
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
