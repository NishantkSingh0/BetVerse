// src/components/ui/button.jsx
export const Button = ({ children, onClick }) => (
   <button 
     onClick={onClick} 
     className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
     {children}
   </button>
 );
// src/components/ui/card.jsx
export const Card = ({ children }) => (
   <div className="bg-white p-4 rounded-lg shadow-md">
     {children}
   </div>
 );
// src/components/ui/input.jsx
export const Input = ({ placeholder, value, onChange }) => (
   <input 
     className="border p-2 rounded-md" 
     placeholder={placeholder} 
     value={value} 
     onChange={onChange}
   />
 );
   