import { useState } from 'react';
import Board from './Board';

export default function Game() {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
    location: null // Track location of each move
  }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true); // Sort order state
  const [boardSize, setBoardSize] = useState(3); // Board size state
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares, location) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1), 
      { squares: nextSquares, location }
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function toggleSortOrder() {
    setIsAscending(!isAscending);
  }

  function handleSizeChange(event) {
    const newSize = parseInt(event.target.value);
    setBoardSize(newSize);
    setHistory([{
      squares: Array(newSize * newSize).fill(null),
      location: null
    }]);
    setCurrentMove(0);
  }

  // Map over history to display moves with location (row, col)
  const moves = history.map((step, move) => {
    const { location } = step;
    let description = move > 0 
      ? `Go to move #${move} (${location ? `row ${location.row}, col ${location.col}` : ''})` 
      : 'Go to game start';
      
    if (move === currentMove) {
      return <li key={move}>You are at move #{move} ({location ? `row ${location.row}, col ${location.col}` : ''})</li>;
    }
    
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Sort the moves based on the sort order
  const sortedMoves = isAscending ? moves : moves.slice().reverse();

  return (
    <>
    <div className="game-settings">
      <label htmlFor="board-size">Choose board size: </label>
      <select id="board-size" value={boardSize} onChange={handleSizeChange}>
        <option value={3}>3x3</option>
        <option value={5}>5x5</option>
        <option value={7}>7x7</option>
        <option value={9}>9x9</option>
        <option value={11}>11x11</option>
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