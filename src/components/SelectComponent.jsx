import React, { forwardRef } from "react";

const Select = forwardRef(
  ({ label, name, value, options, multiple, onChange, ...props }, ref) => (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        multiple={multiple}
        ref={ref}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        {...props}
      >
        {!multiple && <option value="">Select an option</option>}
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
);

export default Select;
