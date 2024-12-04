import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import Toast from "../Components/Toast";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const handleAuth = async () => {
    try {
      setError(""); // Clear previous errors
      if (isLogin) {
        // Log in the user
        await signInWithEmailAndPassword(auth, email, password);
        setToastMessage("Login successful!");
      } else {
        // Sign up the user
        await createUserWithEmailAndPassword(auth, email, password);
        setToastMessage("Signup successful!");
      }
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
        navigate("/home");
      }, 2000);
    } catch (err: any) {
      setError(err.code);
    }
  };

  const closeToast = () => {
    setToastVisible(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-900 dark:text-gray-100 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? "Log In" : "Sign Up"}</h2>
        {error && <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleAuth}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {isLogin ? "Log In" : "Sign Up"}
        </button>
        <p className="text-gray-700 dark:text-gray-400 mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 dark:text-blue-400 underline"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>
      <Toast
        message={toastMessage}
        isVisible={toastVisible}
        onClose={closeToast}
      />
    </div>
  );
};

export default AuthPage;
