import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx'
import { Toaster } from 'react-hot-toast';
import LoginPage from './components/LoginPage.jsx'
import GamePage from './components/GamePage.jsx'

function App() {

  return (
    // <>
    //    <HomePage/>
    // </>
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/BetVerse/" element={<HomePage />} />
        <Route path="/BetVerse/Login" element={<LoginPage />} />
        <Route path="/BetVerse/Login/Games" element={<GamePage />} />
      </Routes>
    </div>
  )
}

export default App
