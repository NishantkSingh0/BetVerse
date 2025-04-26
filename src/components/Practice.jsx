import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider } from "firebase/auth";
import { useUser } from "./userContext.jsx";

const Practice = () => {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const navigate = useNavigate();
  const { userData, setUserData } = useUser();

  // Set up reCAPTCHA verifier
  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'normal',
      'callback': () => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        toast.error("reCAPTCHA expired. Please try again.", {
          duration: 3000,
          position: "top-right",
        });
      }
    });
  }, [auth]);

  const validatePhone = (phoneNumber) => {
    // Remove any spaces or special characters
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    
    if (cleanedNumber.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits");
      return false;
    }
    
    setPhoneError("");
    return true;
  };

  const sendOtp = async () => {
    if (!validatePhone(phone)) {
      return;
    }

    try {
      const formattedPhone = `+91${phone}`; // Formatting for Indian numbers, adjust as needed
      const appVerifier = window.recaptchaVerifier;
      
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(confirmation);
      
      toast.success("OTP sent successfully!", {
        duration: 3000,
        position: "top-right",
      });
      
      setStep("otp");
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(`Error sending OTP: ${error.message}`, {
        duration: 3000,
        position: "top-right",
      });
      
      // Reset reCAPTCHA
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'normal'
      });
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP", {
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    try {
      await confirmationResult.confirm(otp);
      toast.success("Phone number verified successfully!", {
        duration: 3000,
        position: "top-right",
      });
      setStep("form");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP. Please try again.", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  const handleFormSubmit = () => {
    if (!userData.Name || userData.Name.trim() === "") {
      toast.error("Please enter your name", {
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    const result = {
      [phone]: userData,
    };
    
    toast.success("You registered successfully!", {
      duration: 3000,
      position: "top-right",
    });
    
    console.log("User JSON:", result);
    navigate('/Games');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-6 rounded-xl w-full max-w-sm shadow-lg">
        {step === "phone" && (
          <>
            <h2 className="text-xl mb-4 font-semibold">Enter Phone Number</h2>
            <input
              type="tel"
              placeholder="Enter 10-digit phone number"
              className={`w-full sm:px-6 mb-2 sm:p-2 border rounded peer px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 ${phoneError ? 'border-red-500' : ''}`}
              value={phone}
              onChange={(e) => {
                const input = e.target.value;
                // Only allow digits
                if (/^\d*$/.test(input) && input.length <= 10) {
                  setPhone(input);
                  if (input.length === 10 || input.length === 0) {
                    setPhoneError("");
                  }
                }
              }}
              maxLength={10}
            />
            {phoneError && (
              <p className="text-red-500 text-sm mb-2">{phoneError}</p>
            )}
            <div className={`ml-4 w-0 h-1 rounded-full transition-all mb-4 duration-300 peer-hover:w-[60%] peer-focus:w-[88%] sm:peer-focus:w-[87%] bg-blue-500`}></div>
            
            <div id="recaptcha-container" className="mb-4"></div>
            
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
            <p className="text-sm mb-3">We've sent a 6-digit OTP to +91 {phone}</p>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              className={`w-full sm:px-6 mb-2 sm:p-2 border rounded peer px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600`}
              value={otp}
              onChange={(e) => {
                const input = e.target.value;
                // Only allow digits
                if (/^\d*$/.test(input) && input.length <= 6) {
                  setOtp(input);
                }
              }}
              maxLength={6}
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
                onClick={() => {
                  // Reset recaptcha and go back to phone step
                  window.recaptchaVerifier.clear();
                  window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                    'size': 'normal'
                  });
                  setStep("phone");
                }}
                className="text-blue-500 hover:underline font-medium cursor-pointer"
              >
                Try Again
              </button>
            </div>
          </>
        )}

        {step === "form" && (
          <>
            <h2 className="text-xl mb-4 font-semibold">Tell us your name</h2>
            <input
              type="text"
              placeholder="Enter your first name"
              className={`w-full sm:px-6 mb-2 sm:p-2 border rounded peer px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600`}
              value={userData?.Name || ""}
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

export default Practice;