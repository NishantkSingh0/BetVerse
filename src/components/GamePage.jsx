import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Pencil, X } from 'lucide-react';
import {useUser} from "./userContext.jsx"


const imagesURL=["https://th.bing.com/th/id/OIP.XeY97OWJSc0xNON9v93XmgHaH4?w=860&h=915&rs=1&pid=ImgDetMain","https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/209998800/original/82893259d761be5a200ff5f48d3d03e342b35dac/draw-cartoon-avatar-for-logo-professional-photo-profile.jpg","https://th.bing.com/th/id/OIP.Vmt-mlRgpcutog3Gx200UQHaHb?w=718&h=720&rs=1&pid=ImgDetMain","https://th.bing.com/th/id/OIP.XPWbd_anXbY9GCO4QmXQ5gAAAA?w=400&h=300&rs=1&pid=ImgDetMain","https://img.freepik.com/premium-photo/illustration-single-man-american-cartoon-art-style-images-with-ai-generated_545052-3010.jpg","https://static.vecteezy.com/system/resources/previews/046/625/896/original/cartoon-illustration-of-a-man-in-a-suit-and-tie-looking-directly-at-the-viewer-free-vector.jpg","https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4394.jpg?w=740","https://thumbs.dreamstime.com/z/student-avatar-illustration-user-profile-icon-youth-avatar-student-avatar-illustration-simple-cartoon-user-portrait-user-profile-276214145.jpg","https://thumbs.dreamstime.com/b/businessman-avatar-illustration-cartoon-user-portrait-profile-icon-simple-business-leader-vector-276188885.jpg","https://thumbs.dreamstime.com/b/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon-businessman-avatar-illustration-simple-cartoon-user-276189002.jpg","https://img.freepik.com/premium-vector/vector-professional-icon-business-illustration-line-symbol-people-management-career-set-c_1013341-78677.jpg","https://img.freepik.com/premium-vector/design-background-professional-business-illustrationles1sortwitherrorsfirstampqueryjapanese_1013341-284369.jpg","https://img.freepik.com/premium-vector/professional-vector-icon-business-illustration-line-symbol-management-set-people-concept_1013341-65472.jpg"]
const randomImage = imagesURL[Math.floor(Math.random() * imagesURL.length)];
const categories = [
  { 
    name: 'Random Guess', 
    bgColor: 'bg-gradient-to-b from-purple-500 to-purple-800',
    icon: '🎲',
    navigate:'/Guess',
    desc:'Bet on random numbers and won upto 700% of your money'
  },
  { 
    name: 'YouTube', 
    bgColor: 'bg-gradient-to-b from-blue-500 to-blue-800',
    icon: '📈',
    navigate:"/YouAnlyz",
    desc:'Explore Top Youtube channels and predict their like/Views hike'
  },
  { 
    name: 'Football', 
    bgColor: 'bg-gradient-to-b from-red-500 to-red-800',
    icon: '⚽',
    desc:'Predict Football scores and make your money 200% hiked '
  },
  { 
    name: 'Time-Pass', 
    bgColor: 'bg-gradient-to-b from-green-500 to-green-800',
    icon: '⏳',
    // navigate:"/LUDO",
    desc:'Play some timepass games with each other'
  },
  { 
    name: 'Cricket', 
    bgColor: 'bg-gradient-to-b from-orange-500 to-orange-800',
    icon: '🏏',
    // navigate:'/Crick',
    desc:'Predict cricket scores and make your money 300% hiked'
  }
];

export default function GamePage() {
  
  const { userData, setUserData } = useUser();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

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
  
  useEffect(() => {
      // Push a dummy state
    window.history.pushState(null, '', window.location.href);

    const onPopState = (event) => {
      event.preventDefault();

      // Do Nothing

      window.history.pushState(null, '', window.location.href);
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  const handleEditProfile = () => {
    // Handle edit profile logic here
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.src = event.target.result;

      img.onload = function () {
        const size = Math.min(img.width, img.height);
        const x = (img.width - size) / 2;
        const y = (img.height - size) / 2;

        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, x, y, size, size, 0, 0, size, size);

        const base64 = canvas.toDataURL('image/jpeg');
        setUserData((prev) => ({ ...prev, img: base64 }));
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 bg-gray-900 p-4 shadow-md">
        {/* User Profile */}
        <div className="relative flex items-center space-x-4 sm:pl-4">
          <div
            className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 cursor-pointer"
            onClick={toggleProfileMenu}
          >
            {userData.img ? (
              <img
                src={userData.img}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <img
                src={randomImage}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            )}
            <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer shadow-md hover:bg-gray-100">
              <input
                className="hidden"
                type="file"
                onChange={handlePhotoUpload}
              />
            </label>
          </div>
          <div>
            <div className="hidden sm:block text-base font-bold text-gray-200">{userData.Name}</div>
            <div className="block sm:hidden text-base font-bold text-gray-200">{userData.Name.split(' ')[0]}</div>
            <div className="text-sm text-gray-400">Gamer</div>
          </div>
          
          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute z-10 top-14 left-0 w-48 bg-gray-700 rounded-lg shadow-lg border border-gray-500 py-2">
            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />

            <div className="flex justify-between items-center text-amber-200/90 px-4 pb-2 border-b border-gray-500">
              <h3 className="font-medium">{userData.Name}</h3>
              <button onClick={toggleProfileMenu} className="text-gray-200 hover:text-gray-300">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={handleEditProfile}
                className="w-full text-left text-slate-200 px-4 py-2 flex items-center cursor-pointer hover:bg-blue-500"
              >
                <Pencil className="w-4 h-4 mr-2" /> Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 flex items-center text-red-600 cursor-pointer hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" /> Log Out
              </button>
            </div>
          </div>
          )}
        </div>
        
        {/* Coins Section */}
        <div className="flex items-center space-x-3 sm:pr-4">
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-xl text-yellow-600">💰 {userData.Coins}</span>
          </div>
          <Link to="/Purchase" className="text-2xl text-yellow-600 hover:text-yellow-700 font-bold">
            +
          </Link>
        </div>
      </div>


      {/* Game Categories Section */}
      <div className='px-6 pb-10'>
        <div className="text-center sm:text-left ml-4 sm:ml-6">
          <h2 className="text-2xl font-bold text-gray-200 mb-1">Game Categories</h2>
          <div className="w-40 h-1 border ml-0 sm:ml-3 border-blue-700 rounded bg-blue-700 mb-6 inline-block"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => navigate(category.navigate)}
              className={`h-44 sm:h-48 overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer border-0 ${category.bgColor} bg-opacity-15 hover:bg-opacity-25`}
            >
              <div className="flex flex-col justify-between h-full p-4">
                <div className="text-4xl" style={{ textShadow: '2px 1px 2px black' }}>{category.icon}</div>
                <div>
                <div className="text-lg font-bold mt-4 text-white" style={{ textShadow: '1px 1px 2px black' }}>
                   {category.name}
                 </div>
                 <div className="text-sm mt-1 text-gray-100" style={{ textShadow: '1px 1px 2px black' }}>
                   {category.desc}
                 </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}