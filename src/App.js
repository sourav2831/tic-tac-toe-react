import { useState } from "react";
import Game from "./Game";
import "./App.css";

function App() {
  const [squareSideLength, setSquareSideLength] = useState(0);
  return (
    <div className="App">
      <div>Tic Tac Toe</div>
      <input
        type="number"
        onChange={(e) => setSquareSideLength(Number(e.target.value))}
      />
      <Game squareSideLength={squareSideLength} />
    </div>
  );
}

export default App;
