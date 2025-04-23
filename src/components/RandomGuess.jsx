import React, { useState, useEffect, useRef } from 'react';
import toast from "react-hot-toast";
import {useUser} from "./userContext.jsx"

const RandomGuess = () => {
  // Mock user data - in a real application, this would come from props or context
  const { userData, setUserData } = useUser();

  const [selectedNumber, setSelectedNumber] = useState(null);
  const selectedNumberRef = useRef(null);
  const [numberSelections, setNumberSelections] = useState(Array(10).fill(0));
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showingResults, setShowingResults] = useState(false);
  const [result, setResult] = useState(null);
  const [roundCount, setRoundCount] = useState(1);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingSelection, setPendingSelection] = useState(null);
  const hasProcessedResultRef = useRef(false); // Changed to useRef for more reliable tracking
  const [winAmount, setWinAmount] = useState(0); // Track winning amount for display
  
  // Constants for timing
  const GAME_DURATION = 120; // 2 minutes in seconds
  const RESULT_DURATION = 30; // 30 seconds
  const CYCLE_DURATION = GAME_DURATION + RESULT_DURATION; // 150 seconds total
  const BET_AMOUNT = 10; // Amount deducted per selection

  // Update the ref whenever selectedNumber changes
  useEffect(() => {
    selectedNumberRef.current = selectedNumber;
  }, [selectedNumber]);

  // Debug logging for result and selection
  useEffect(() => {
    if (result && selectedNumberRef.current !== null) {
      console.log("DEBUG - Selected:", selectedNumberRef.current, "Results:", result);
      console.log("hasProcessedResult:", hasProcessedResultRef.current);
    }
  }, [result]);

  useEffect(() => {
    // Set up the timer that updates every second
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Calculate where we are in the global time cycle
      const secondsToday = 
        now.getHours() * 3600 + 
        now.getMinutes() * 60 + 
        now.getSeconds();
      
      // Calculate current round number based on seconds passed today
      const cyclesSoFar = Math.floor(secondsToday / CYCLE_DURATION);
      const newRoundCount = cyclesSoFar + 1;
      
      // Calculate position within current cycle
      const secondsInCurrentCycle = secondsToday % CYCLE_DURATION;
      
      // Determine if we're in game phase or results phase
      const inResultPhase = secondsInCurrentCycle >= GAME_DURATION;
      
      // Calculate time remaining in current phase
      if (inResultPhase) {
        // In results phase
        const resultTimeRemaining = CYCLE_DURATION - secondsInCurrentCycle;
        setTimeRemaining(resultTimeRemaining);
        
        // Generate results if we just entered results phase
        if (!showingResults) {
          console.log("Entering results phase, selection:", selectedNumberRef.current);
          setShowingResults(true);
          hasProcessedResultRef.current = false; // Reset the flag when entering result phase
          generateResults();
        }
      } else {
        // In game phase
        const gameTimeRemaining = GAME_DURATION - secondsInCurrentCycle;
        setTimeRemaining(gameTimeRemaining);
        
        // Reset selection if we just started a new game phase
        if (showingResults) {
          console.log("Entering game phase, resetting");
          setShowingResults(false);
          setSelectedNumber(null);
          setNumberSelections(Array(10).fill(0));
          setWinAmount(0);
          // Don't reset hasProcessedResultRef here, only set it to true in generateResults
        }
      }
      
      // Update round count if it changed
      if (newRoundCount !== roundCount) {
        setRoundCount(newRoundCount);
      }
      
      // Check if it's noon to reset round counter
      if (now.getHours() === 12 && now.getMinutes() === 0 && now.getSeconds() === 0) {
        setRoundCount(1);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [showingResults, roundCount]);

  const generateResults = () => {
    const selectedNumber = selectedNumberRef.current;
    const allNumbers = Array.from({ length: 10 }, (_, i) => i); // [0, 1, ..., 9]
  
    // Assign weights: lower for selectedNumber, higher and uniform for others
    const weights = allNumbers.map(num => (num === selectedNumber ? 1 : 10));
  
    // Helper to pick unique numbers based on weights
    const weightedRandomSample = (nums, weights, count) => {
      const selected = new Set();
  
      while (selected.size < count) {
        const totalWeight = weights.reduce((acc, w, i) => selected.has(nums[i]) ? acc : acc + w, 0);
        let r = Math.random() * totalWeight;
        for (let i = 0; i < nums.length; i++) {
          if (selected.has(nums[i])) continue;
          r -= weights[i];
          if (r <= 0) {
            selected.add(nums[i]);
            break;
          }
        }
      }
  
      return [...selected];
    };
  
    const [first, second, third] = weightedRandomSample(allNumbers, weights, 3);
  
    const resultObj = { first, second, third };
    setResult(resultObj);
  
    console.log("GENERATE RESULTS - Selected Number:", selectedNumber, "Result:", resultObj);
  
    processResults(resultObj);
  };
  

  const processResults = (resultObj) => {
    // Make sure we only process once and have a valid selection
    if (hasProcessedResultRef.current || selectedNumberRef.current === null) {
      console.log("Skipping result processing - already processed or no selection");
      return;
    }

    const { first, second, third } = resultObj;
    const selectedNum = selectedNumberRef.current;
    
    // Force numbers for comparison to ensure accurate matching
    const selectedNumAsInt = parseInt(selectedNum, 10);
    const firstAsInt = parseInt(first, 10);
    const secondAsInt = parseInt(second, 10);
    const thirdAsInt = parseInt(third, 10);
    
    console.log("Processing results", {
      selected: selectedNumAsInt,
      first: firstAsInt,
      second: secondAsInt,
      third: thirdAsInt
    });

    let amount = 0;
    
    // Check if user won and calculate amount
    if (selectedNumAsInt === firstAsInt) {
      amount = 80;
      console.log("First prize match! Adding 80 coins");
    } else if (selectedNumAsInt === secondAsInt) {
      amount = 50;
      console.log("Second prize match! Adding 50 coins");
    } else if (selectedNumAsInt === thirdAsInt) {
      amount = 30;
      console.log("Third prize match! Adding 30 coins");
    }
    
    // Update coins if the user won something
    if (amount > 0) {
      console.log("User won", amount, "coins");
      setWinAmount(amount);
      setUserData(prev => {
        const newCoins = Number((Number(prev.Coins) + amount).toFixed(2));
        console.log("Updating user coins from", prev.Coins, "to", newCoins);
        return {
          ...prev,
          Coins: newCoins
        };
      });
    } else {
      console.log("User did not win with number", selectedNumAsInt);
    }
    
    // Mark as processed to prevent multiple updates
    hasProcessedResultRef.current = true;
  };
  

  const handleNumberClick = (num) => {
    if (!showingResults && userData.Coins >= BET_AMOUNT) {
      setPendingSelection(num);
      setShowConfirmation(true);
    } else if (userData.Coins < BET_AMOUNT) {
      toast.error("Not enough coins! You need at least 10 coins to play.", {
        duration: 3000,
        position: "top-right",
      });
      // alert("Not enough coins! You need at least 10 coins to play.");
    }
  };

  const confirmSelection = () => {
    // Update the selected number
    setSelectedNumber(pendingSelection);
    selectedNumberRef.current = pendingSelection; // Update the ref immediately
    
    // Update the number selections count
    const newSelections = [...numberSelections];
    newSelections[pendingSelection] += 1;
    setNumberSelections(newSelections);
    
    // Deduct coins from user balance
    setUserData(prev => {
      const newCoins = Number((Number(prev.Coins) - BET_AMOUNT).toFixed(2));
      console.log("Deducting bet amount. Coins from", prev.Coins, "to", newCoins);
      return {...prev, Coins: newCoins};
    });
    
    // Close the confirmation popup
    setShowConfirmation(false);
    console.log("Selection confirmed:", pendingSelection);
  };

  const cancelSelection = () => {
    setPendingSelection(null);
    setShowConfirmation(false);
  };

  const formatTime = (time) => {
    const m = String(Math.floor(time / 60)).padStart(2, '0');
    const s = String(time % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const formatCurrentTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };

  // Calculate next round start time for display
  const getNextRoundTime = () => {
    const now = new Date(currentTime);
    const secondsToday = 
      now.getHours() * 3600 + 
      now.getMinutes() * 60 + 
      now.getSeconds();
    
    const secondsUntilNextCycle = CYCLE_DURATION - (secondsToday % CYCLE_DURATION);
    const nextRoundTime = new Date(now.getTime() + secondsUntilNextCycle * 1000);
    
    return nextRoundTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };

  // Calculate current round's start and end times
  const getCurrentRoundTimes = () => {
    const now = new Date(currentTime);
    const secondsToday = 
      now.getHours() * 3600 + 
      now.getMinutes() * 60 + 
      now.getSeconds();
    
    const secondsInCurrentCycle = secondsToday % CYCLE_DURATION;
    
    // Calculate start time of current round
    const roundStartTime = new Date(now.getTime() - secondsInCurrentCycle * 1000);
    const roundEndTime = new Date(roundStartTime.getTime() + GAME_DURATION * 1000);
    
    const formatTimeOnly = (date) => {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };
    
    return {
      start: formatTimeOnly(roundStartTime),
      end: formatTimeOnly(roundEndTime)
    };
  };

  const roundTimes = getCurrentRoundTimes();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center px-4 py-6 relative">
      <h1 className="text-4xl font-bold mb-12 text-center">🎲 Random Guess</h1>
      
      {!showingResults && <div className="bg-gray-950 rounded-xl shadow p-4 md:p-6 w-full  mb-6">
        <div className="flex justify-between items-center mb-3">
          <p className="text-lg md:text-xl font-medium text-gray-200">📢 Use Case:</p>
          <p className="text-lg font-bold text-yellow-600">Your balance: {userData.Coins}💰</p>
        </div>
        <p className="text-sm md:text-base text-gray-200 leading-relaxed">
          You have to invest <span className="font-bold text-yellow-600">10💰</span> on any number you trust. and wait 2min for more participants to join.
          After that, our system will randomly select 3 numbers:
          <br />
          🥇 First prize goes to <span className="text-green-600 font-bold">700% hiked (80💰)</span><br />
          🥈 Second prize goes to <span className="text-green-600/90 font-bold">400% hiked (50💰)</span><br />
          🥉 Third prize goes to <span className="text-green-600/85 font-bold">200% hiked (30💰)</span>
        </p>
      </div>}

      {!showingResults ? (
        <>
          <div className="mb-4 text-lg font-semibold">Choose a number between 0 to 9</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6 w-full max-w-2xl">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                onClick={() => handleNumberClick(i)}
                className={`${
                  selectedNumber === i ? 'bg-blue-700 border-2 border-blue-500' : 'bg-slate-700 hover:bg-slate-800'
                } text-2xl md:text-4xl font-bold text-center p-6 md:p-8 rounded-xl shadow-lg transition cursor-pointer`}
              >
                {i}
              </div>
            ))}
          </div>

          <div className="text-lg font-semibold mb-2 text-blue-500">
            ⏳ Time left: {formatTime(timeRemaining)}
          </div>
          {selectedNumber !== null && (
            <p className="text-sm text-gray-400">You selected: <span className="font-semibold">{selectedNumber}</span></p>
          )}
        </>
      ) : (
        <div className="text-center bg-gray-950 p-6 rounded-xl shadow max-w-xl w-full">
          <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Round {roundCount} Results!</h2>
          <p className="text-lg font-medium mb-2">The 3 random numbers selected are:</p>
          <div className="mt-4 space-y-2 text-xl">
            <div>🥇 First Prize for num <span className="font-bold">{result?.first ?? 'N/A'}</span></div>
            <div>🥈 Second Prize for num <span className="font-bold">{result?.second ?? 'N/A'}</span></div>
            <div>🥉 Third Prize for num <span className="font-bold">{result?.third ?? 'N/A'}</span></div>
          </div>
          
          {/* Display what the user selected */}
          {selectedNumberRef.current !== null && (
            <div className="mt-4 p-3 bg-blue-950 rounded-lg">
              <p>Your selection: <span className="font-bold">{selectedNumberRef.current}</span></p>
              {winAmount > 0 ? 
                (<p className="text-green-600 font-bold mt-1">
                  You won {winAmount}💰!
                </p>):(<p className="text-red-400 font-bold mt-1">
                  You lossed!
                </p>)
              }
            </div>
          )}
          
          <div className="mt-6 text-gray-600">
            <p>Next round starts in: <span className="font-bold">{formatTime(timeRemaining)}</span></p>
            <p className="text-sm mt-1">Next round starts at: {getNextRoundTime()}</p>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-700 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Confirm Your Selection</h3>
            <p className="mb-4">Are you sure you want to select number <span className="font-bold">{pendingSelection}</span>?</p>
            <div className="bg-gray-800 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="font-medium">Balance Change:</p>
              <p className="text-lg">
                {userData.Coins} 💰 → {Number((Number(userData.Coins) - BET_AMOUNT).toFixed(2))} 💰
                <span className="text-red-500 ml-2">(-{BET_AMOUNT})</span>
              </p>
            </div>
            <div className="flex space-x-3 justify-end">
              <button 
                onClick={cancelSelection}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded-lg transition"
              >
                Cancel
              </button>
              <button 
                onClick={confirmSelection}
                className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomGuess;