import { useState, useEffect } from "react";
import Board from "./Board";
import { X, O } from "./constants";

const Game = ({ squareSideLength }) => {
  const [squares, setSquares] = useState(
    Array.from({ length: squareSideLength }, () =>
      Array.from({ length: squareSideLength }, () => null)
    )
  );
  const [isXTurn, setIsXturn] = useState(true);
  const [gameStatus, setGameStatus] = useState({ win: false, draw: false });
  const currentPlayer = isXTurn ? X : O;

  const checkRowColumnWin = (i, j, board, isRow) => {
    if (j >= squareSideLength) return true;
    if (board[isRow ? i : j][isRow ? j : i] !== currentPlayer) return false;
    return checkRowColumnWin(i, j + 1, board, isRow);
  };

  const checkFirstDiagonalWin = (i, j, board) => {
    if (i >= squareSideLength || j >= squareSideLength) return true;
    if (board[i][j] !== currentPlayer) return false;
    return checkFirstDiagonalWin(i + 1, j + 1, board);
  };

  const checkSecondDiagonalWin = (i, j, board) => {
    if (i >= squareSideLength || j < 0) return true;
    if (board[i][j] !== currentPlayer) return false;
    return checkSecondDiagonalWin(i + 1, j - 1, board);
  };

  const isWin = (i, j, board) => {
    return (
      checkRowColumnWin(i, 0, board, true) ||
      checkRowColumnWin(j, 0, board, false) ||
      checkFirstDiagonalWin(0, 0, board) ||
      checkSecondDiagonalWin(0, squareSideLength - 1, board)
    );
  };

  const checkDraw = (board) => {
    let isDraw = true;
    board.forEach((row) => {
      row.forEach((cell) => {
        if (!cell) isDraw = false;
      });
    });
    return isDraw;
  };

  const handleCellClick = (e, i, j) => {
    e.stopPropagation();
    if (squares[i][j]) return;
    setSquares((prev) => {
      prev[i][j] = currentPlayer;
      if (isWin(i, j, prev)) setGameStatus({ win: true });
      else {
        if (checkDraw(prev)) setGameStatus({ draw: true });
        setIsXturn(!isXTurn);
      }
      return prev;
    });
  };

  useEffect(() => {
    setSquares(
      Array.from({ length: squareSideLength }, () =>
        Array.from({ length: squareSideLength }, () => null)
      )
    );
  }, [squareSideLength]);

  return (
    <div>
      {gameStatus.win && <div>{currentPlayer} Wins!!</div>}
      {gameStatus.draw && <div>Match Draw!!</div>}
      <Board
        squares={squares}
        handleCellClick={handleCellClick}
        disableCell={gameStatus.win || gameStatus.draw}
      />
    </div>
  );
};

export default Game;
