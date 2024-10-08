import Square from './Square';
import { calculateWinner } from './utils';

export default function Board({ xIsNext, squares, onPlay, size }) {
  const result = calculateWinner(squares, size);
  const winner = result?.winner || null;
  const winningSquares = result?.winningSquares || [];

  const handleClick = (index) => {
    if (winner || squares[index]) return;

    const nextSquares = [...squares];
    nextSquares[index] = xIsNext ? 'X' : 'O';

    const row = Math.floor(index / size);
    const col = index % size;

    onPlay(nextSquares, { row, col });
  };

  const getStatus = () => {
    if (winner) return `Winner: ${winner}`;
    if (squares.every(Boolean)) return "It's a draw!";
    return `Next player: ${xIsNext ? 'X' : 'O'}`;
  };

  const renderBoard = () => {
    return Array.from({ length: size }, (_, row) => (
      <div key={row} className="board-row">
        {Array.from({ length: size }, (_, col) => {
          const index = row * size + col;
          return (
            <Square
              key={index}
              value={squares[index]}
              onSquareClick={() => handleClick(index)}
              highlight={winningSquares.includes(index)}
            />
          );
        })}
      </div>
    ));
  };

  return (
    <>
      <div className="status">{getStatus()}</div>
      {renderBoard()}
    </>
  );
}
