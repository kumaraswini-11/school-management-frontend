import React, { forwardRef } from "react";

const Button = forwardRef(
  ({ type = "button", onClick, children, disabled, ...props }, ref) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      ref={ref}
      className={`px-4 py-2 rounded-md w-full sm:w-auto ${
        type === "submit"
          ? "bg-purple-600 text-white hover:bg-purple-700"
          : "bg-gray-300 text-gray-700 hover:bg-gray-400"
      } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
      {...props}
    >
      {children}
    </button>
  )
);

export default Button;
