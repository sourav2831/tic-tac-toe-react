import "./index.css";

const Board = ({ squares, handleCellClick }) => {
  return (
    <div className="board-container">
      {squares.map((row, i) => {
        return (
          <div className="board-row">
            {row.map((cell, j) => {
              return (
                <div className="cell" onClick={(e) => handleCellClick(e, i, j)}>
                  {cell}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
