export function calculateWinner(squares, size) {
  const lines = [];
  const winLength = size === 3 ? 3 : 5; // Define win length based on board size

  // Rows
  for (let row = 0; row < size; row++) {
    for (let col = 0; col <= size - winLength; col++) {
      const rowLine = [];
      for (let i = 0; i < winLength; i++) {
        rowLine.push(row * size + (col + i));
      }
      lines.push(rowLine);
    }
  }

  // Columns
  for (let col = 0; col < size; col++) {
    for (let row = 0; row <= size - winLength; row++) {
      const colLine = [];
      for (let i = 0; i < winLength; i++) {
        colLine.push((row + i) * size + col);
      }
      lines.push(colLine);
    }
  }

  // Diagonals (top-left to bottom-right)
  for (let row = 0; row <= size - winLength; row++) {
    for (let col = 0; col <= size - winLength; col++) {
      const diag1 = [];
      for (let i = 0; i < winLength; i++) {
        diag1.push((row + i) * size + (col + i));
      }
      lines.push(diag1);
    }
  }

  // Diagonals (top-right to bottom-left)
  for (let row = 0; row <= size - winLength; row++) {
    for (let col = winLength - 1; col < size; col++) {
      const diag2 = [];
      for (let i = 0; i < winLength; i++) {
        diag2.push((row + i) * size + (col - i));
      }
      lines.push(diag2);
    }
  }

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
