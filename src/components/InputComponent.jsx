import React, { forwardRef } from "react";

const Input = forwardRef(
  ({ label, name, type, value, onChange, ...props }, ref) => (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        ref={ref}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        {...props}
      />
    </div>
  )
);

export default Input;
