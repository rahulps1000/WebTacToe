import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Room from "./Components/Room";

function App({ socket }) {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Home socket={socket} />} />
        <Route path="/room/:roomId" element={<Room socket={socket} />} />
      </Routes>
    </div>
  );
}

export default App;
