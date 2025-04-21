import React, { useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [step, setStep] = useState("phone"); 
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState("");
  const [userData, setUserData] = useState({
    Name: "",
    Coins: "20",
    Enrolled: [],
  });

  const sendOtp = () => {
    // Simulate OTP send
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    toast.success(`Your OTP is: ${generatedOtp}`, {
      duration: 3000,
      position: "top-right",
    });
    setSentOtp(generatedOtp);
    setStep("otp");
  };

  const verifyOtp = () => {
    if (otp === sentOtp) {
      setStep("form");
    } else {
      toast.error("Invalid OTP", {
         duration: 3000,
         position: "top-right",
       });
    }
  };

  const handleFormSubmit = () => {
    const result = {
      [phone]: userData,
    };
    toast.success("you registered successfully!", {
      duration: 3000,
      position: "top-right",
    });
    console.log("User JSON:", result);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-6 rounded-xl w-full max-w-sm shadow-lg">
        {step === "phone" && (
          <>
            <h2 className="text-xl mb-4 font-semibold">Enter Phone Number</h2>

               <input
                  type="text"
                  placeholder="Enter Phone number"
                  className={`w-full sm:px-6 mb-2 sm:p-2 border rounded peer px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div className={`ml-4 w-0 h-1 rounded-full transition-all mb-4 duration-300 peer-hover:w-[60%] peer-focus:w-[88%] sm:peer-focus:w-[87%] bg-blue-500`}></div>

            <button
              onClick={sendOtp}
              className="bg-blue-600 w-full py-2 rounded hover:bg-blue-700 cursor-pointer"
            >
              Send OTP
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <h2 className="text-xl mb-4 font-semibold">Enter OTP</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              className={`w-full sm:px-6 mb-2 sm:p-2 border rounded peer px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600`}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className={`ml-4 w-0 h-1 rounded-full transition-all mb-4 duration-300 peer-hover:w-[60%] peer-focus:w-[88%] sm:peer-focus:w-[87%] bg-blue-500`}></div>

            <button
              onClick={verifyOtp}
              className="bg-green-600 w-full py-2 rounded hover:bg-green-700 cursor-pointer"
            >
              Verify OTP
            </button>
            <div className="mt-3 text-sm text-center">
              Didn't receive the OTP?{" "}
              <button
                onClick={sendOtp}
                className="text-blue-500 hover:underline font-medium cursor-pointer"
              >
                Resend
              </button>
            </div>
          </>
        )}

        {step === "form" && (
          <>
            <h2 className="text-xl mb-4 font-semibold">User Details</h2>
            <input
               type="text"
               placeholder="Enter your name"
               className={`w-full sm:px-6 mb-2 sm:p-2 border rounded peer px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600`}
               value={userData.Name}
               onChange={(e) =>
                  setUserData((prev) => ({ ...prev, Name: e.target.value }))
               }
            />
            <div className={`ml-4 w-0 h-1 rounded-full transition-all mb-4 duration-300 peer-hover:w-[60%] peer-focus:w-[88%] sm:peer-focus:w-[87%] bg-blue-500`}></div>
            
            <button
              onClick={handleFormSubmit}
              className="bg-purple-600 w-full py-2 rounded hover:bg-purple-700"
            >
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;