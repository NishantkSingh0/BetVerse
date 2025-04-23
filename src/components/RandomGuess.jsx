import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RandomGuess = () => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [numberSelections, setNumberSelections] = useState(Array(10).fill(0));
  const [timer, setTimer] = useState(60); // 1 min for demo, use 300 for 5 mins
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState(null);

  const navigate = useNavigate();

  const handleSelection = (num) => {
    if (!gameOver) {
      setSelectedNumber(num);
      const newSelections = [...numberSelections];
      newSelections[num] += 1;
      setNumberSelections(newSelections);
      if (!gameStarted) setGameStarted(true);
    }
  };

  useEffect(() => {
    let interval;
    if (gameStarted && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0 && gameStarted) {
      // Find 3 least selected numbers randomly ordered
      const sorted = numberSelections
        .map((count, number) => ({ number, count }))
        .sort((a, b) => a.count - b.count);

      const minThree = sorted.slice(0, 3).map(item => item.number);
      const shuffled = minThree.sort(() => 0.5 - Math.random());

      setResult({
        first: shuffled[0] ?? 'N/A',
        second: shuffled[1] ?? 'N/A',
        third: shuffled[2] ?? 'N/A',
      });
      setGameOver(true);
    }

    return () => clearInterval(interval);
  }, [gameStarted, timer, numberSelections]);

  const formatTime = (time) => {
    const m = String(Math.floor(time / 60)).padStart(2, '0');
    const s = String(time % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center px-4 py-6">
      <h1 className="text-4xl font-bold mb-4 text-center">🎲 Random Guess Game</h1>
      
      <div className="bg-white rounded-xl shadow p-4 md:p-6 w-full mb-6">
        <p className="text-lg md:text-xl font-medium text-gray-700 mb-2">📢 Use Case:</p>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          You have to invest <span className="font-bold text-yellow-600">10💰</span> on any number you trust. and wait 5min for more participant to join
          After that, our system will randomly select 3 numbers:
          <br />
          🥇 First prize goes to <span className="text-green-600 font-bold">700% hiked (80💰)</span><br />
          🥈 Second prize goes to <span className="text-green-600/90 font-bold">400% hiked (50💰)</span><br />
          🥉 Third prize goes to <span className="text-green-600/85 font-bold">200% hiked (30💰)</span>
        </p>
      </div>

      {!gameOver ? (
        <>
          <div className="mb-4 text-lg font-semibold">Choose a number between 0 to 9</div>
          <div className="grid grid-cols-5 md:grid-cols-5 gap-4 mb-6 w-full max-w-2xl">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                onClick={() => handleSelection(i)}
                className="bg-white hover:bg-blue-50 text-2xl md:text-4xl font-bold text-center p-6 md:p-8 rounded-xl shadow-lg transition cursor-pointer"
              >
                {i}
              </div>
            ))}
          </div>

          {gameStarted && (
            <div className="text-lg font-semibold mb-2 text-blue-600">
              ⏳ Time left: {formatTime(timer)}
            </div>
          )}
          {selectedNumber !== null && (
            <p className="text-sm text-gray-500">You selected: <span className="font-semibold">{selectedNumber}</span></p>
          )}
        </>
      ) : (
        <div className="text-center bg-white p-6 rounded-xl shadow max-w-xl">
          <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Game Over!</h2>
          <p className="text-lg font-medium mb-2">the 3 random number selected are</p>
          <div className="mt-4 space-y-2 text-xl">
            <div>🥇 First Prize: <span className="font-bold">{result.first}</span></div>
            <div>🥈 Second Prize: <span className="font-bold">{result.second}</span></div>
            <div>🥉 Third Prize: <span className="font-bold">{result.third}</span></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomGuess;
