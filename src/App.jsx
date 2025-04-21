import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx'
import { Toaster } from 'react-hot-toast';
import LoginPage from './components/LoginPage.jsx'

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
      </Routes>
    </div>
  )
}

export default App
