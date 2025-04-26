import React, { useState, useEffect, useRef } from 'react';
import toast from "react-hot-toast";
import {useUser} from "./userContext.jsx"

const RandomGuess = () => {
  // Mock user data - in a real application, this would come from props or context
  const { userData, setUserData } = useUser();

  // const [selectedNumbers, setSelectedNumbers] = useState([]);
  const selectedNumbersRef = useRef([]);
  const [numberSelections, setNumberSelections] = useState(Array(10).fill(0));
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showingResults, setShowingResults] = useState(false);
  const [result, setResult] = useState(null);
  const [roundCount, setRoundCount] = useState(1);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingSelection, setPendingSelection] = useState(null);
  const hasProcessedResultRef = useRef(false);
  const [winAmount, setWinAmount] = useState(0);
  const [betAmount, setBetAmount] = useState(10);
  
  // Constants for timing
  const GAME_DURATION = 120; // 2 minutes in seconds
  const RESULT_DURATION = 30; // 30 seconds
  const CYCLE_DURATION = GAME_DURATION + RESULT_DURATION; // 150 seconds total
  const MAX_SELECTIONS = 3; // Maximum number of selections allowed

  // Update the ref whenever selectedNumbers changes
  useEffect(() => {
    selectedNumbersRef.current = userData?.randomGuess;
  }, [userData?.randomGuess]);

  // Debug logging for result and selection
  useEffect(() => {
    if (result && selectedNumbersRef.current.length > 0) {
      // console.log("DEBUG - Selected:", selectedNumbersRef.current, "Results:", result);
      // console.log("hasProcessedResult:", hasProcessedResultRef.current);
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
          console.log("Entering results phase, selections:", selectedNumbersRef.current);
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
          // console.log("Entering game phase, resetting");
          setShowingResults(false);
          setUserData(prev => ({...prev,randomGuess: []}));
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
    const selectedNumbers = selectedNumbersRef.current;
    const allNumbers = Array.from({ length: 10 }, (_, i) => i); // [0, 1, ..., 9]
  
    // Assign weights: lower for selectedNumbers, higher and uniform for others
    const weights = allNumbers.map(num => (selectedNumbers.includes(num) ? 1 : 10));
  
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
  
    // console.log("GENERATE RESULTS - Selected Numbers:", selectedNumbers, "Result:", resultObj);
  
    processResults(resultObj);
  };
  
  const processResults = (resultObj) => {
    // Make sure we only process once and have valid selections
    if (hasProcessedResultRef.current || selectedNumbersRef.current.length === 0) {
      // console.log("Skipping result processing - already processed or no selections");
      return;
    }

    const { first, second, third } = resultObj;
    const selectedNums = selectedNumbersRef.current;
    
    // Force numbers for comparison to ensure accurate matching
    const firstAsInt = parseInt(first, 10);
    const secondAsInt = parseInt(second, 10);
    const thirdAsInt = parseInt(third, 10);
    
    // console.log("Processing results", {
    //   selected: selectedNums,
    //   first: firstAsInt,
    //   second: secondAsInt,
    //   third: thirdAsInt
    // });

    let totalWinAmount = 0;
    setUserData(prev => ({...prev,Coins: Number((Number(prev.Coins)-(betAmount *  userData?.randomGuess.length))).toFixed(2)}));
    
    // Check for each selected number if user won and calculate amount
    selectedNums.forEach(num => {
      const selectedNumAsInt = parseInt(num, 10);
      
      if (selectedNumAsInt === firstAsInt) {
        const winnings = betAmount * 8; // 700% hike + original bet
        totalWinAmount += winnings;
        // console.log(`First prize match for ${selectedNumAsInt}! Adding ${winnings} coins`);
      } else if (selectedNumAsInt === secondAsInt) {
        const winnings = betAmount * 5; // 400% hike + original bet
        totalWinAmount += winnings;
        // console.log(`Second prize match for ${selectedNumAsInt}! Adding ${winnings} coins`);
      } else if (selectedNumAsInt === thirdAsInt) {
        const winnings = betAmount * 3; // 200% hike + original bet
        totalWinAmount += winnings;
        // console.log(`Third prize match for ${selectedNumAsInt}! Adding ${winnings} coins`);
      }
    });
    
    // Update coins if the user won something
    if (totalWinAmount > 0) {
      // console.log("User won", totalWinAmount, "coins");
      setWinAmount(totalWinAmount);
      setUserData(prev => {
        const newCoins = Number((Number(prev.Coins) + totalWinAmount).toFixed(2));
        // console.log("Updating user coins from", prev.Coins, "to", newCoins);
        return {
          ...prev,
          Coins: newCoins
        };
      });
    } else {
      // console.log("User did not win with numbers", selectedNums);
    }
    
    // Mark as processed to prevent multiple updates
    hasProcessedResultRef.current = true;
  };

  const handleNumberClick = (num) => {
    if (showingResults) return;
    
    const totalCost = betAmount * (userData?.randomGuess.includes(num) ?  userData?.randomGuess.length - 1 :  userData?.randomGuess.length + 1);
    
    if ( userData?.randomGuess.includes(num)) {
      // If number is already selected, deselect it
      setUserData(prev => ({...prev,randomGuess: prev.filter(n => n !== num)}));
      const newSelections = [...numberSelections];
      newSelections[num] -= 1;
      setNumberSelections(newSelections);
      
      // Refund the bet amount for this number
      setUserData(prev => {
        const newCoins = Number((Number(prev.Coins) + betAmount).toFixed(2));
        return {...prev, Coins: newCoins};
      });
    } else {
      // Check if user can afford another bet
      if (userData.Coins < betAmount) {
        toast.error(`Not enough coins! You need at least ${betAmount} coins to place this bet.`, {
          duration: 3000,
          position: "top-right",
        });
        return;
      }
      
      // Check if max selections reached
      if ( userData?.randomGuess.length >= MAX_SELECTIONS) {
        toast.error(`Maximum ${MAX_SELECTIONS} numbers can be selected!`, {
          duration: 3000,
          position: "top-right",
        });
        return;
      }
      
      // Add number to selections
      setPendingSelection(num);
      setShowConfirmation(true);
    }
  };

  const confirmSelection = () => {
    // Update the selected numbers
    setUserData(prev => ({ ...prev, randomGuess: [...prev.randomGuess, pendingSelection]}));
    selectedNumbersRef.current = [...selectedNumbersRef.current, pendingSelection]; // Update the ref immediately
    
    // Update the number selections count
    const newSelections = [...numberSelections];
    newSelections[pendingSelection] += 1;
    setNumberSelections(newSelections);
    
    // Deduct coins from user balance
    setUserData(prev => {
      const newCoins = Number((Number(prev.Coins) - betAmount).toFixed(2));
      // console.log("Deducting bet amount. Coins from", prev.Coins, "to", newCoins);
      return {...prev, Coins: newCoins};
    });
    
    // Close the confirmation popup
    setShowConfirmation(false);
    // console.log("Selection confirmed:", pendingSelection);
  };

  const cancelSelection = () => {
    setPendingSelection(null);
    setShowConfirmation(false);
  };

  const handleBetAmountChange = (e) => {
    // if (userData.Coins>=betAmount *  userData?.randomGuess.length){
    //   toast.error(`Not enough coins! Recharge first`, {duration: 3000,position: "top-right",})
    //   return;
    // }
    setBetAmount(parseInt(e.target.value, 10));
  };

  const formatTime = (time) => {
    const m = String(Math.floor(time / 60)).padStart(2, '0');
    const s = String(time % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center px-4 py-6 relative">
      <h1 className="text-4xl font-bold mb-6 text-center">🎲 Random Guess</h1>
      
      {!showingResults && <div className="bg-gray-950 rounded-xl shadow p-4 md:p-6 w-full mb-6">
        <div className="flex justify-between items-center mb-3">
          <p className="text-lg md:text-xl font-medium text-gray-200">📢 Use Case:</p>
          <p className="hidden sm:block text-lg font-bold text-yellow-600">Your Balance: {Number(userData.Coins - (betAmount *  userData?.randomGuess.length)).toFixed(2)}💰</p>
          <p className="block sm:hidden text-lg font-bold text-yellow-600">🏦: {userData.Coins}💰</p>
        </div>
        <p className="text-sm md:text-base text-gray-200 leading-relaxed">
          Choose up to <span className="font-bold text-blue-400">3 numbers</span> and set your bet amount. 
          Wait 2min for more participants to join.
          After that, our system will randomly select 3 numbers:
          <br />
          🥇 First prize goes to <span className="text-green-600 font-bold">+700% hiked (<span className='text-yellow-600 font-bold'>{`${betAmount} -> ${betAmount * 8}`}</span>)💰</span><br />
          🥈 Second prize goes to <span className="text-green-600/90 font-bold">+400% hiked (<span className='text-yellow-600 font-bold'>{`${betAmount} -> ${betAmount * 5}`}</span>)💰</span><br />
          🥉 Third prize goes to <span className="text-green-600/85 font-bold">+200% hiked (<span className='text-yellow-600 font-bold'>{`${betAmount} -> ${betAmount * 3}`}</span>)💰</span>
        </p>
      </div>}

      {!showingResults ? (
        <>
          {/* Bet Amount Slider */}
          <div className="bg-gray-800 rounded-xl flex justify-between p-4 w-full max-w-[700px] mb-6">
            {/* <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Adjust bet Amount:</h3>
              <span className="font-bold text-yellow-500">{betAmount}💰</span>
            </div> */}
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={betAmount}
              onChange={handleBetAmountChange}
              className="w-[85%] sm:w-[90%] h-2 mt-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="font-bold sm:ml-2 text-yellow-500">{betAmount}💰</span>
          </div>
          
          <div className="mb-4 text-lg font-semibold">
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6 w-full max-w-2xl">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                onClick={() => handleNumberClick(i)}
                className={`${
                  userData?.randomGuess.includes(i) ? 'bg-blue-700 border-2 border-blue-500' : 'bg-slate-700 hover:bg-slate-800'
                } text-2xl md:text-4xl font-bold text-center p-6 md:p-8 rounded-xl shadow-lg transition cursor-pointer`}
              >
                {i}
              </div>
            ))}
          </div>

          <div className="text-lg font-semibold mb-2 text-blue-500">
            ⏳ Time left: {formatTime(timeRemaining)}
          </div>
          { userData?.randomGuess.length > 0 && (
            <div className="text-sm text-gray-400 flex justify-between items-center gap-2">
              <p>Your selections: <span className="font-semibold">{ userData?.randomGuess.join(', ')}</span></p> <p className='font-extrabold'>|</p>
              <p>Total bet: <span className="font-semibold text-yellow-500">{betAmount *  userData?.randomGuess.length}💰</span></p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center bg-gray-950 p-6 mt-20 rounded-xl shadow max-w-xl w-full">
          <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Round {roundCount} Results!</h2>
          <p className="text-lg font-medium mb-2">The 3 random numbers selected are:</p>
          <div className="mt-4 space-y-2 text-xl">
            <div>🥇 First Prize for number <span className="font-bold">{result?.first ?? 'N/A'}</span></div>
            <div>🥈 Second Prize for number <span className="font-bold">{result?.second ?? 'N/A'}</span></div>
            <div>🥉 Third Prize for number <span className="font-bold">{result?.third ?? 'N/A'}</span></div>
          </div>
          
          {/* Display what the user selected */}
          {selectedNumbersRef.current.length > 0 && (
            <div className="mt-4 p-3 bg-blue-950 rounded-lg">
              <p>Your selections: <span className="font-bold">{selectedNumbersRef.current.join(', ')}</span></p>
              {/* <p>Bet per number: <span className="font-bold text-yellow-500">{betAmount}💰</span></p> */}
              {winAmount > 0 ? 
                (<p className="text-green-600 font-bold mt-1">
                  You won {winAmount}💰!
                </p>):(<p className="text-red-400 font-bold mt-1">
                  Better luck next time!
                </p>)
              }
            </div>
          )}
          
          <div className="mt-6 text-gray-600">
            <p>Next round starts in: <span className="font-bold">{formatTime(timeRemaining)}</span></p>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-700 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Confirm Selection</h3>
            <p className="mb-4">You want to bet <span className="font-bold text-yellow-500">{betAmount}💰</span> on number <span className="font-bold">{pendingSelection}</span>?</p>
            <div className="bg-gray-800 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="font-medium">Balance Change:</p>
              <p className="text-lg">
                {userData.Coins}💰 → {Number((Number(userData.Coins) - betAmount).toFixed(2))}💰
                <span className="text-red-500 ml-2">(-{betAmount})</span>
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