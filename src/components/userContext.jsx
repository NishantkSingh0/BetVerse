import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    Name: "",
    Coins: "200.00",
    Enrolled: [],
    Password:"",
    img: "",
    randomGuess: { list: [], betAmount: "10" }
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);