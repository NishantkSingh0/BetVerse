import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './Comps.jsx';
import { UploadCloud, LogOut, Pencil, X } from 'lucide-react';

// Category images based on title
const categories = [
  { 
    name: 'Random Games', 
    bgColor: 'bg-purple-500',
    icon: '🎮'
  },
  { 
    name: 'E-Sport', 
    bgColor: 'bg-blue-500',
    icon: '🏆'
  },
  { 
    name: 'Time-Pass', 
    bgColor: 'bg-green-500',
    icon: '⏳'
  },
  { 
    name: 'Cricket', 
    bgColor: 'bg-yellow-500',
    icon: '🏏'
  },
  { 
    name: 'Football', 
    bgColor: 'bg-red-500',
    icon: '⚽'
  }
];

export default function GamePage() {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login');
  };

  const handleEditProfile = () => {
    // Handle edit profile logic here
    navigate('/edit-profile');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* User Profile Section */}
      <div className="relative mb-8">
        <div className="flex items-center space-x-4">
          <div 
            className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 cursor-pointer"
            onClick={toggleProfileMenu}
          >
            {profilePhoto ? (
              <img src={profilePhoto} alt="Profile" className="object-cover w-full h-full" />
            ) : (
              <div className="w-full h-full bg-blue-200 flex items-center justify-center text-blue-700 font-medium">
                User
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer shadow-md hover:bg-gray-100">
              <UploadCloud className="w-4 h-4 text-blue-600" />
              <input 
                 className="border p-2 rounded-md" 
                 type='file'
                 onChange={handlePhotoUpload}
               />
            </label>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-800">Username</div>
            <div className="text-sm text-gray-500">Game Enthusiast</div>
          </div>
        </div>

        {/* Profile Menu Popup */}
        {showProfileMenu && (
          <div className="absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
            <div className="flex justify-between items-center px-4 pb-2 border-b border-gray-200">
              <h3 className="font-medium">Profile Options</h3>
              <button onClick={toggleProfileMenu} className="text-gray-500 hover:text-gray-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="pt-2">
              <button 
                onClick={handleEditProfile}
                className="w-full text-left px-4 py-2 flex items-center text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              >
                <Pencil className="w-4 h-4 mr-2" /> Edit Profile
              </button>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 flex items-center text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" /> Log Out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Game Categories Section */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Game Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`h-40 sm:h-52 overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer border-0 ${category.bgColor} bg-opacity-15 hover:bg-opacity-25`}
          >
            <div className="flex flex-col justify-between h-full p-4">
              <div className="text-4xl">{category.icon}</div>
              <div>
              <div className="text-lg font-bold mt-4 text-gray-800" style={{ textShadow: '1px 1px 2px white' }}>
                 {category.name}
               </div>
               <div className="text-sm mt-1 text-gray-600" style={{ textShadow: '1px 1px 2px white' }}>
                 Click to explore
               </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}