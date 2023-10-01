import React, { useState, useEffect } from "react";
import "./style.css";

import Cross from "../Cross";
import Circle from "../Circle";

let initData = ["", "", "", "", "", "", "", "", ""];

const Board = ({ socket, roomId, update }) => {
  const [count, setCount] = useState(0);
  const [admin, setAdmin] = useState(false);
  const [data, setData] = useState(initData);

  const mark = (v) => {
    if (data[v] === "") {
      if (count % 2 === 0 && admin) {
        let temp = data;
        temp[v] = "x";
        setData(temp);
      } else if (count % 2 === 1 && !admin) {
        let temp = data;
        temp[v] = "o";
        setData(temp);
      } else {
        return;
      }
      socket.emit("move", roomId, v);
      setCount((x) => x + 1);
    }
  };

  const getSymbol = (val) => {
    if (val === "x") {
      return <Cross />;
    } else if (val === "o") {
      return <Circle />;
    } else {
      return;
    }
  };

  const resetBoard = () => {
    socket.emit("resetBoard", roomId);
    setCount(0);
    alert("Game Over!");
    setData(initData);
  };

  useEffect(() => {
    socket.emit("startGame", roomId);
    socket.on("startGame", (game) => {
      if (game.admin === socket.id) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
      setData(game.board);
      setCount(game.player);
      update.name(game.names);
      update.score(game.score);
    });
    socket.on("move", () => {
      socket.emit("gameOver", roomId);
    });
    socket.on("gameOver", (game) => {
      update.name(game.names);
      update.score(game.score);
      resetBoard();
    });

    return () => {
      socket.off();
    };
  }, [data]); // eslint-disable-line

  return (
    <div className="board_container">
      <div className="board">
        <div className="row one">
          <div className="box" onClick={() => mark(0)}>
            {getSymbol(data[0])}
          </div>
          <div className="box" onClick={() => mark(1)}>
            {getSymbol(data[1])}
          </div>
          <div className="box" onClick={() => mark(2)}>
            {getSymbol(data[2])}
          </div>
        </div>
        <div className="row two">
          <div className="box" onClick={() => mark(3)}>
            {getSymbol(data[3])}
          </div>
          <div className="box" onClick={() => mark(4)}>
            {getSymbol(data[4])}
          </div>
          <div className="box" onClick={() => mark(5)}>
            {getSymbol(data[5])}
          </div>
        </div>
        <div className="row three">
          <div className="box" onClick={() => mark(6)}>
            {getSymbol(data[6])}
          </div>
          <div className="box" onClick={() => mark(7)}>
            {getSymbol(data[7])}
          </div>
          <div className="box" onClick={() => mark(8)}>
            {getSymbol(data[8])}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
