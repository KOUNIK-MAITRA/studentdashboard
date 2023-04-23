import React from "react";

const Button = ({ text, color, onClick }) => {
  let gradient = "";
  if (color === "danger") {
    gradient = "bg-gradient-to-r from-rose-600 to-pink-700";
  }
  if (color === "success") {
    gradient = "bg-gradient-to-r from-emerald-500 to-emerald-500";
  }
  if (color === "submit") {
    gradient = "bg-gradient-to-r from-blue-400 to-emerald-400";
  }
  return (
    <button
      type='button'
      className={`py-2 px-6 ${gradient} text-white font-semibold rounded-md shadow-md hover:opacity-90 `}
      onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
