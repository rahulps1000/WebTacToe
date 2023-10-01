import React from "react";
import "./style.css";
import { toast } from "react-toastify";

const InviteBox = ({ roomId }) => {
  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Url Copied to Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div className="invite_box">
      <h1>Waiting for Co-Player....</h1>
      <h3>Share the below code with your friend</h3>
      <div className="room_code">
        <h2>{roomId}</h2>
        <button onClick={copyUrl}>Copy as Url</button>
      </div>
    </div>
  );
};

export default InviteBox;
