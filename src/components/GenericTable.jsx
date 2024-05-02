import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const GenericTable = ({
  fetchDataFunction,
  columns,
  defaultSortColumn,
  defaultSortOrder,
  tableClassName,
  onEditClick,
  onDeleteClick,
  fromPage,
}) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState(defaultSortColumn);
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const debouncedSearchValue = useMemo(() => {
    return searchValue;
  }, [searchValue]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchDataFunction({
        page: currentPage,
        sortBy,
        sortOrder,
        searchValue: debouncedSearchValue,
      });

      setData(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, sortBy, sortOrder, debouncedSearchValue]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (columnName) => {
    if (columnName === columns[0].key) {
      return;
    }

    if (sortBy === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(columnName);
      setSortOrder("asc");
    }
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAction = (id, actionType) => {
    switch (actionType) {
      case "edit":
        onEditClick(id);
        break;
      case "delete":
        onDeleteClick(id);
        break;
      default:
        break;
    }
  };

  const handleOnClickNewTab = (id) => {
    navigate(`/class-graph/${id}`, { state: { key: "value" } });
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end mb-4">
        {/* <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearch}
          className="border border-gray-300 rounded px-2 py-1.5 mr-4"
        /> */}
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>ERROR: {error.message}</div>}
      {!loading && !error && (
        <>
          <table
            className={`min-w-full divide-y divide-gray-200 ${tableClassName}`}
          >
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    onClick={() => handleSort(column.key)}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    {column.title}
                    {sortBy === column.key && (
                      <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((row, index) => (
                <tr key={row._id}>
                  {columns.map((column) => (
                    <td
                      key={`${row._id}-${column.key}`}
                      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                        fromPage === "classes" && column.key === "className"
                          ? "underline cursor-pointer"
                          : ""
                      }`}
                      onClick={
                        fromPage === "classes" && column.key === "className"
                          ? () => handleOnClickNewTab(row._id)
                          : null
                      }
                      title={
                        fromPage === "classes" && column.key === "className"
                          ? "View Particular Class's Chart"
                          : ""
                      }
                    >
                      {column.key === "_id"
                        ? index + 1
                        : column.key === "dob" && fromPage !== "classes"
                          ? new Date(row[column.key]).toLocaleDateString()
                          : row[column.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={() => handleAction(row._id, "edit")}
                      className="text-blue-500 mr-2"
                      title="Edit"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleAction(row._id, "delete")}
                      className="text-red-500"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-sm text-gray-600">{`Showing ${currentPage} of ${totalPages}`}</p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() =>
                  currentPage > 1 && handlePagination(currentPage - 1)
                }
                className={`px-3 py-1 border rounded mr-2 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
                disabled={currentPage === 1 || loading}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePagination(page)}
                    className={`px-3 py-1 border rounded mr-2 ${page === currentPage ? "bg-gray-200" : "hover:bg-gray-200"}`}
                    disabled={loading}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  currentPage < totalPages && handlePagination(currentPage + 1)
                }
                className={`px-3 py-1 border rounded mr-2 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
                disabled={currentPage === totalPages || loading}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GenericTable;
