import React, { useEffect } from "react";

const Alert = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div
      role="alert"
      className="alert alert-success border flex bg-green-500 absolute w-1/4 rounded p-4 gap-10 top-4 justify-between
       "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{message}</span>
      <button onClick={onClose}>✖️</button>
    </div>
  );
};

export default Alert;
