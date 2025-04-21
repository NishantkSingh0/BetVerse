import React from "react";

const HomePage = () => {
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
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          🏆 Bet Smart. Win Big.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-8">
          Real-time odds. Instant wins. Zero limits.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <button className="bg-gradient-to-r from-green-400 to-blue-500 px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition">
            Join Now
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
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-16 px-6 bg-black">
        {[
          { icon: "🛡️", title: "100% Secure", desc: "Encrypted & Regulated" },
          { icon: "🚀", title: "Instant Payouts", desc: "Fast withdrawals" },
          { icon: "📱", title: "Mobile Ready", desc: "Smooth on all devices" },
          { icon: "🌟", title: "Easy win", desc: "just invest your skills and win in seconds" },
          { icon: "📱", title: "Mobile Ready", desc: "Smooth on all devices" },
          { icon: "📱", title: "Mobile Ready", desc: "Smooth on all devices" },
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
