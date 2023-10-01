import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div
      className="navbar"
      onClick={() => {
        navigate("/");
      }}
    >
      <div className="logo">
        <img src="../logo.png" alt="Logo" />
        <span className="text">WebTacToe</span>
      </div>
    </div>
  );
};

export default NavBar;
