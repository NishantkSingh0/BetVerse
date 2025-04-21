import React from "react";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-24 relative">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover opacity-20 -z-10"
          autoPlay
          loop
          muted
        >
          <source src="/stadium.mp4" type="video/mp4" />
        </video>
        <h1 className="text-3xl sm:text-6xl font-bold mb-4">
          🏆 Bet Smart. Win Big.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-8">
          Real-time odds. Instant wins. Zero limits.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <button
            className="bg-gradient-to-r from-green-400 to-blue-500 px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
            onClick={() => navigate('/BetVerse/Login')}
          >
            Let's bet!
          </button>
          <button className="bg-white text-black px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-200 transition">
            View Live Odds
          </button>
        </div>
      </section>

      {/* Live Odds Strip */}
      <section className="bg-gray-950 py-6 overflow-x-auto whitespace-nowrap px-4 border-t border-gray-800">
        <div className="flex gap-4">
          {[
            { match: "🏀 Lakers vs Celtics", odds: "2.3x", tag: "LIVE" },
            { match: "⚽ Arsenal vs Man U", odds: "1.8x", tag: "65% Arsenal" },
            { match: "🎾 Nadal vs Alcaraz", odds: "3.0x", tag: "CLOSE ODDS" },
            { match: "🏏 India vs Pakistan", odds: "2.1x", tag: "HOT PICK" },
            { match: "🏈 Chiefs vs Eagles", odds: "2.7x", tag: "HIGH STAKES" },
            { match: "🎮 CS:GO Grand Finals", odds: "4.5x", tag: "ESPORTS" },
            { match: "⚽ PSG vs Real Madrid", odds: "2.0x", tag: "TRENDING" },
            { match: "🥊 Fury vs Usyk", odds: "2.9x", tag: "FIGHT NIGHT" },
            { match: "🎾 Osaka vs Swiatek", odds: "3.2x", tag: "WOMEN’S SLAM" },
            { match: "🏀 Warriors vs Bucks", odds: "1.6x", tag: "UNDERDOG WIN" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-800 px-6 py-4 rounded-lg min-w-[250px] hover:shadow-xl hover:scale-105 transition cursor-pointer"
            >
              <h3 className="text-lg font-bold">{item.match}</h3>
              <p className="text-green-400 font-mono text-xl">{item.odds}</p>
              <span className="text-sm text-gray-400">{item.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights Section */}
      <section className="grid grid-cols-1 py-8 md:grid-cols-3 gap-6 md:py-16 px-6 bg-black">
        {[
           { icon: "🛡️", title: "100% Secure", desc: "Encrypted & Regulated" },
           { icon: "🚀", title: "Instant Payouts", desc: "Fast withdrawals" },
           { icon: "📱", title: "Mobile Ready", desc: "Seamless play on any device" },
          //  { icon: "🌟", title: "Skill-Based Wins", desc: "Invest your skills & win in seconds" },
          //  { icon: "📊", title: "Live Odds", desc: "Real-time dynamic betting odds" },
          //  { icon: "🎮", title: "Multiple Games", desc: "Fantasy, sports, cards & more" },
          //  { icon: "👥", title: "Community Play", desc: "Play with friends or join global contests" },
          //  { icon: "🎁", title: "Daily Rewards", desc: "Login bonuses & special offers" },
          //  { icon: "🌐", title: "Global Access", desc: "Play anywhere, anytime" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-800 rounded-xl p-6 text-center shadow-md"
          >
            <div className="text-4xl mb-2">{item.icon}</div>
            <h4 className="text-xl font-semibold mb-1">{item.title}</h4>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-500 border-t border-gray-800">
        © {new Date().getFullYear()} <a href="https://nishantksingh0.github.io" target="_blank"> NishantkSingh0</a> — All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
