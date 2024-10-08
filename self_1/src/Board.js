import Square from './Square';
import { calculateWinner } from './utils';

export default function Board({ xIsNext, squares, onPlay, size }) {
  const result = calculateWinner(squares, size);
  const winner = result ? result.winner : null;
  const winningSquares = result ? result.winningSquares : [];

  function handleClick(i) {
    if (winner || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';

    const row = Math.floor(i / size);
    const col = i % size;

    onPlay(nextSquares, { row, col });
  }

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (squares.every(Boolean)) {
    status = "It's a draw!";
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const board = [];
  for (let row = 0; row < size; row++) {
    const squaresRow = [];
    for (let col = 0; col < size; col++) {
      const index = row * size + col;
      squaresRow.push(
        <Square
          key={index}
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
          highlight={winningSquares.includes(index)}
        />
      );
    }
    board.push(
      <div key={row} className="board-row">
        {squaresRow}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {board}
    </>
  );
}