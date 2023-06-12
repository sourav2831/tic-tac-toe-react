import Game from "./Game";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div>Tic Tac Toe</div>
      <Game squareSideLength={3} />
    </div>
  );
}

export default App;
