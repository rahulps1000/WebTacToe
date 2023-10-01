import React from "react";
import "./style.css";

const ResultBox = ({ names, score }) => {
  return (
    <div className="resultbox">
      <h1>Result</h1>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{names.admin ?? "Player 1"}</td>
            <td>{score.admin}</td>
          </tr>
          <tr>
            <td>{names.co ?? "Player 2"}</td>
            <td>{score.co}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResultBox;
