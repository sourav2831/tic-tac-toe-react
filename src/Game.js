import { useState } from "react";
import Board from "./Board";
import { X, O } from "./constants";

const Game = ({ squareSideLength }) => {
  const [squares, setSquares] = useState(
    Array.from({ length: squareSideLength }, (v) =>
      Array.from({ length: squareSideLength }, (v) => null)
    )
  );
  const [isXTurn, setIsXturn] = useState(true);
  const currentPlayer = isXTurn ? X : O;

  const checkRowColumnWin = (i, j, board, isRow) => {
    if (j >= squareSideLength) return true;
    if (board[isRow ? i : j][isRow ? j : i] !== currentPlayer) return false;
    return checkRowColumnWin(i, j + 1, board, isRow);
  };

  const isWin = (i, j, board) => {
    return (
      checkRowColumnWin(i, 0, board, true) ||
      checkRowColumnWin(j, 0, board, false)
    );
  };

  const handleCellClick = (e, i, j) => {
    e.stopPropagation();
    if (squares[i][j]) return;
    setSquares((prev) => {
      prev[i][j] = currentPlayer;
      if (isWin(i, j, prev)) console.log("win", currentPlayer);
      return prev;
    });
    setIsXturn(!isXTurn);
  };

  return (
    <div>
      <Board squares={squares} handleCellClick={handleCellClick} />
    </div>
  );
};

export default Game;
