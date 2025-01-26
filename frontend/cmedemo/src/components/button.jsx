import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-2 bg-neonBlue text-white rounded transition duration-300 hover:bg-blue-500"
    >
      {children}
    </button>
  );
};

export default Button;
