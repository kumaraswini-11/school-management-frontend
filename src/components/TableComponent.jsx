import React from "react";
import { getOptionName, getMultipleOptionNames } from "../utils/helpers";

const TableComponent = ({
  modelSchema,
  data,
  onEdit,
  onDelete,
  dynamicOptions = {},
  currentPage,
  totalPages,
  onPageChange,
}) => {
  console.log("modelSchema :", modelSchema);
  console.log("data : ", data);
  console.log("dynamicOptions : ", dynamicOptions);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      onDelete(id);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {modelSchema.map(({ label, name }) => (
              <th
                key={name}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {label}
              </th>
            ))}
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item._id}>
              {modelSchema.map(({ name, type }) => (
                <td
                  key={name}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                >
                  {type === "select"
                    ? getOptionName(dynamicOptions[name], item[name])
                    : type === "select-multiple"
                      ? getMultipleOptionNames(
                          dynamicOptions[name],
                          item[name]
                        ).join(", ")
                      : item[name]}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(item)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-600 hover:text-red-900 ml-4"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationDetails
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

const PaginationDetails = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mt-4 flex justify-between items-center">
      <div className="text-sm text-gray-700">
        Showing page {currentPage} of {totalPages}
      </div>
      <div className="flex">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 mr-2 ${
            currentPage === 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 ${
            currentPage === totalPages
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
