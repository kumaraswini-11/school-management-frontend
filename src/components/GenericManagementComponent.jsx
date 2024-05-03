import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GenericTable, DeleteConfirmationOverlay, AddEditOverlay } from ".";

function GenericManagementComponent({
  columns,
  fetchDataFunction,
  pageTitle,
  fromPage,
  initialFormData,
  inputFields,
}) {
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [isAddEditOverlayVisible, setAddEditOverlayVisible] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddEditClick = (itemId) => {
    setEditItemId(itemId);
    setAddEditOverlayVisible(true);
  };

  const handleDeleteClick = (itemId) => {
    setDeleteConfirmationVisible(true);
    setItemIdToDelete(itemId);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationVisible(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/${fromPage}/${itemIdToDelete}`
      );
      toast.success("Item Deleted Successfully.");
      fetchData();
    } catch (error) {
      toast.error("An error occurred while deleting. Please try again.");
    } finally {
      setDeleteConfirmationVisible(false);
    }
  };

  const handleAddEditFormSubmit = async (formData) => {
    try {
      const url = editItemId
        ? `${import.meta.env.VITE_BASE_URL}/api/v1/${fromPage}/${editItemId}`
        : `${import.meta.env.VITE_BASE_URL}/api/v1/${fromPage}`;

      const method = editItemId ? "put" : "post";

      await axios[method](url, formData);

      const message = editItemId
        ? "Item Updated Successfully."
        : "Item Added Successfully.";
      toast.success(message);
      fetchData();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setEditItemId(null);
      setAddEditOverlayVisible(false);
    }
  };

  const fetchData = async () => {
    const data = await fetchDataFunction();
  };

  return (
    <section className="container mx-auto px-0.5 py-0.5">
      <h1 className="text-2xl font-bold mb-4">{pageTitle}</h1>

      <div className="mb-4">
        <button
          className="bg-gradient-to-r from-indigo-500 via-purple-500 text-white font-bold py-2 px-4 rounded hover:border-blue-500"
          onClick={() => handleAddEditClick(null)}
        >
          + Add New Record
        </button>
      </div>

      <GenericTable
        fetchDataFunction={fetchDataFunction}
        columns={columns}
        defaultSortColumn={columns[1].key}
        defaultSortOrder="asc"
        onEditClick={handleAddEditClick}
        onDeleteClick={handleDeleteClick}
        fromPage={fromPage}
      />

      {isDeleteConfirmationVisible && (
        <DeleteConfirmationOverlay
          onCancel={handleCancelDelete}
          onConfirmDelete={handleConfirmDelete}
        />
      )}

      {isAddEditOverlayVisible && (
        <AddEditOverlay
          initialFormData={initialFormData}
          inputFields={inputFields}
          isVisible={isAddEditOverlayVisible}
          itemId={editItemId}
          fromPage={fromPage}
          onCancel={() => {
            setAddEditOverlayVisible(false);
            setEditItemId(null);
          }}
          onSubmit={handleAddEditFormSubmit}
        />
      )}
    </section>
  );
}

export default GenericManagementComponent;
