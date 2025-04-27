import React from 'react';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from './userContext.jsx';

export default function PurchaseCoin() {
  const { userData, setUserData } = useUser();

  const coinPackages = [
    {
      price: '₹360',
      coins: 413.86,
      premium: true
    },
    {
      price: '₹180',
      coins: 201.22
    },
    {
      price: '₹100',
      coins: 110.75,
      popular: true
    },
    {
      price: '₹80',
      coins: 86.94
    },
    {
      price: '₹64',
      coins: 68.49
    },
    {
      price: '₹45',
      coins: 47.46
    }
  ];

  const handlePurchase = (price, coins) => {
    setUserData(prev => ({...prev,Coins: Number((Number(prev.Coins)+coins)).toFixed(2)}));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Link to="/Games" className="mr-4 mt-1">
          <ArrowLeft className="w-8 h-8 sm:h-10 text-gray-300 transform transition-transform duration-100 hover:scale-110" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-300">Purchase Coins</h1>
      </div>

      {/* Current Balance */}
      <div className="bg-gray-950 rounded-lg shadow-md p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-200 text-sm">Current Balance</p>
            <p className="text-xl font-bold text-yellow-600">💰 {userData?.Coins || 0}</p>
          </div>
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
            Game Currency 💰
          </div>
        </div>
      </div>

      {/* Coin Packages */}
      <div className="grid gap-4">
        {coinPackages.map((pkg, index) => (
          <div 
            key={index} 
            className={`bg-gray-950 rounded-xl shadow-md w-full md:w-4/5 h-44 sm:h-52 mx-auto relative overflow-hidden ${pkg.popular ? 'border-2 border-blue-500' : pkg.premium?'border-2 border-amber-500':''}`}
          >
            {pkg.popular && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-lg text-xs font-bold">
                POPULAR
              </div>
            )}
            
            {pkg.premium && (
              <div className="absolute top-0 right-0 bg-amber-500 text-white px-3 py-1 rounded-bl-lg text-xs font-bold">
                PREMIUM
              </div>
            )}
            
            <div className="flex flex-col justify-between h-full p-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xl md:text-3xl font-bold text-gray-300">{pkg.price}</div>
                  <div className="text-2xl md:text-4xl font-bold text-yellow-600">💰 {pkg.coins}</div>
                </div>
                
                {/* <div className="text-sm text-gray-500 mb-6">
                  Buy game coins to participate in various games and win exciting rewards!
                </div> */}
              </div>
              
              <button 
                onClick={() => handlePurchase(pkg.price, pkg.coins)}
                className={`w-full py-3 rounded-lg font-medium text-white ${pkg.popular ? 'bg-blue-600 hover:bg-blue-700' : pkg.premium?'bg-amber-600 hover:bg-amber-700':'bg-green-600 hover:bg-green-700'} transition-colors flex items-center justify-center`}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Purchase Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Information */}
      <div className="mt-8 bg-gray-950 rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold text-gray-200 mb-2">Important Information</h3>
        <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
          <li>Coins purchased are for in-game use only.</li>
          <li>Transactions are secured with RazorPay, PayTm & CashFree.</li>
          <li>For payment issues, <a href="mailto:nishantksingh.talk@gmail.com" className='text-blue-400 underline'>mail</a> us with your problem and attached proof's.</li>
          <li>All taxes are included in the displayed prices.</li>
        </ul>
      </div>
    </div>
  );
}