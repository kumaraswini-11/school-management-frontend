import React, { forwardRef } from "react";

const Select = forwardRef(
  (
    {
      label,
      name,
      allOptions = [],
      selectedOptions = [],
      multiple,
      onChange,
      ...props
    },
    ref
  ) => {
    // Ensure selectedOptions is an array
    // const selectedArrayOptions = Array.isArray(selectedOptions)
    //   ? selectedOptions
    //   : [selectedOptions];
    // const selectedValues = selectedArrayOptions
    //   .map((option) => option?._id)
    //   .filter(Boolean);

    // Ensure selectedOptions is an array
    const selectedArrayOptions = Array.isArray(selectedOptions)
      ? selectedOptions
      : [selectedOptions];

    // Handle scalar value for single select
    const selectedValues = multiple
      ? selectedArrayOptions.map((option) => option?._id).filter(Boolean)
      : selectedArrayOptions[0]?._id || "";

    return (
      <div className="w-full">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <select
          id={name}
          name={name}
          onChange={onChange}
          multiple={multiple}
          value={selectedArrayOptions}
          ref={ref}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          {...props}
        >
          {!multiple && <option value="">Select an option</option>}
          {allOptions.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Select;
