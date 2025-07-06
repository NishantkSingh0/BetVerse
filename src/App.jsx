import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx'
import { Toaster } from 'react-hot-toast';
import LoginPage from './components/LoginPage.jsx'
import GamePage from './components/GamePage.jsx'
import RandomGuess from './components/RandomGuess.jsx'
import PurchaseCoin from './components/PurchaseCoin.jsx'
import Practice from './components/Practice.jsx'
import Cricket from './components/Cricket.jsx'
import YoutubeAnalyze from './components/YouAnalyz/YoutubeAnalyze.jsx'
import ShowJsonReceived from './components/YouAnalyz/ShowJsonReceived.jsx'

function App() {

  return (
    // <>
    //    <Practice/>
    // </>
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Games" element={<GamePage />} />
        <Route path="/Purchase" element={<PurchaseCoin />} />
        <Route path="/Guess" element={<RandomGuess />} />
        <Route path="/Crick" element={<Cricket />} />
        <Route path="/YouAnlyz" element={<YoutubeAnalyze />} />
      </Routes>
    </div>
  )
}

export default App
