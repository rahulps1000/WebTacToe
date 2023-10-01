import React, { useEffect, useState } from "react";
import "./style.css";

import { useParams } from "react-router-dom";
import InviteBox from "../InviteBox";
import NavBar from "../NavBar";
import Board from "../Board";
import ResultBox from "../ResultBox";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Room = ({ socket }) => {
  const { roomId } = useParams();
  const [coPlayer, setCoPlayer] = useState(false);
  const [score, setScore] = useState({ admin: 0, co: 0 });
  const [names, setNames] = useState({ admin: "Player 1", co: "Player 2" });
  const navigate = useNavigate();

  const getName = () => {
    var name = localStorage.getItem("name");
    return name ? name : socket.id;
  };

  const showError = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  useEffect(() => {
    socket.emit("joinRoom", roomId, getName());

    socket.on("userJoined", () => {
      setCoPlayer(true);
    });

    socket.on("roomFull", () => {
      showError("Room is full!");
      navigate("/");
    });

    socket.on("invalidRoom", () => {
      showError("Invalid Room!");
      navigate("/");
    });

    return () => {
      socket.off();
    };
  }, []); // eslint-disable-line

  return (
    <div className="room">
      <NavBar />
      {coPlayer ? (
        <div className="game">
          <Board
            socket={socket}
            roomId={roomId}
            update={{ score: setScore, name: setNames }}
          />
          <ResultBox names={names} score={score} />
        </div>
      ) : (
        <InviteBox roomId={roomId} />
      )}
    </div>
  );
};

export default Room;
