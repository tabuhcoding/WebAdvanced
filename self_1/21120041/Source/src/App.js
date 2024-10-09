import { useState } from 'react';
import Board from './Board';

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), location: null }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const [boardSize, setBoardSize] = useState(3);
  
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  const handlePlay = (nextSquares, location) => {
    const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, location }];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (move) => setCurrentMove(move);

  const toggleSortOrder = () => setIsAscending(!isAscending);

  const handleSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    setBoardSize(newSize);
    setHistory([{ squares: Array(newSize * newSize).fill(null), location: null }]);
    setCurrentMove(0);
  };

  const renderMoves = () => {
    return history.map((step, move) => {
      const { location } = step;
      const description = move > 0 
        ? `Go to move #${move} (${location ? `row ${location.row}, col ${location.col}` : ''})` 
        : 'Go to game start';

      if (move === currentMove) {
        return (
          <li key={move}>
            <strong>You are at move #{move} {location && `(row ${location.row}, col ${location.col})`}</strong>
          </li>
        );
      }
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    });
  };

  const sortedMoves = isAscending ? renderMoves() : renderMoves().reverse();

  return (
    <>
      <div className="game-settings">
        <label htmlFor="board-size">Choose board size: </label>
        <select id="board-size" value={boardSize} onChange={handleSizeChange}>
          {[3, 5, 7, 9, 11].map(size => (
            <option key={size} value={size}>{`${size}x${size}`}</option>
          ))}
        </select>
      </div>
      <div className="game">
        <div className="game-board">
          <Board 
            xIsNext={xIsNext} 
            squares={currentSquares} 
            onPlay={handlePlay} 
            size={boardSize} 
          />
        </div>
        <div className="game-info">
          <button onClick={toggleSortOrder}>
            {isAscending ? 'Sort Descending' : 'Sort Ascending'}
          </button>
          <ol>{sortedMoves}</ol>
        </div>
      </div>
    </>
  );
}
