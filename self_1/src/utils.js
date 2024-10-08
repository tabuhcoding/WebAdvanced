export function calculateWinner(squares, size) {
  const lines = [];

  // Rows
  for (let row = 0; row < size; row++) {
    const rowLine = [];
    for (let col = 0; col < size; col++) {
      rowLine.push(row * size + col);
    }
    lines.push(rowLine);
  }

  // Columns
  for (let col = 0; col < size; col++) {
    const colLine = [];
    for (let row = 0; row < size; row++) {
      colLine.push(row * size + col);
    }
    lines.push(colLine);
  }

  // Diagonal (top-left to bottom-right)
  const diag1 = [];
  for (let i = 0; i < size; i++) {
    diag1.push(i * size + i);
  }
  lines.push(diag1);

  // Diagonal (top-right to bottom-left)
  const diag2 = [];
  for (let i = 0; i < size; i++) {
    diag2.push(i * size + (size - i - 1));
  }
  lines.push(diag2);

  // Check for a winner
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [a, ...rest] = line;
    if (squares[a] && rest.every(index => squares[index] === squares[a])) {
      return { winner: squares[a], winningSquares: line };
    }
  }

  return null;
}

