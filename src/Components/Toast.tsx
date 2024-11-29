import React from "react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          className="ml-4 text-white font-bold"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
