import { useState } from 'react';

/**
 * Render a square button with the given value and click event handler.
 *
 * @param {object} value - the value to display on the square
 * @param {function} onSquareClick - the click event handler for the square
 * @return {JSX.Element} a button component representing the square
 */
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  // Function to handle the click of a square
  function handleClick(i) {
    // If there is a winner or the square is already filled, return
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // Create a copy of the current squares array
    const nextSquares = squares.slice();
    // Set the value of the clicked square based on the next player
    nextSquares[i] = xIsNext ? 'X' : 'O';
    // Call the onPlay function with the updated squares array
    onPlay(nextSquares);
  }

  // Calculate the winner based on the current squares
  const winner = calculateWinner(squares);
  let status;
  // Set the status based on whether there is a winner or the next player
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  // Return the board UI with the status and square components
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}


export default function Game() {
  // Setting up state variables using the useState hook
  const [history, setHistory] = useState([Array(9).fill(null)]); // Initialize history with an array of 9 null values
  const [currentMove, setCurrentMove] = useState(0); // Initialize currentMove with 0
  const xIsNext = currentMove % 2 === 0; // Determine if it's X's turn based on currentMove
  const currentSquares = history[currentMove]; // Get the squares for the current move

  // Function to handle the next move
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; // Create a new history array with the next move
    setHistory(nextHistory); // Update the history state
    setCurrentMove(nextHistory.length - 1); // Update the currentMove state
  }

  // Function to jump to a specific move
  function jumpTo(nextMove) {
    setCurrentMove(nextMove); // Update the currentMove state to jump to the specified move
  }

  // Generate a list of moves as buttons
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move; // Set description for moves after the first move
    } else {
      description = 'Go to game start'; // Set description for the first move
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button> {/* Create button for each move with the corresponding description */}
      </li>
    );
  });

  // Render the game board and move history
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} /> {/* Render the game board with the current state */}
      </div>
      <div className="game-info">
        <ol>{moves}</ol> {/* Render the list of moves */}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
