import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDataContext } from "../context/DataContext";
import FormComponent from "../components/FormComponent";
import TableComponent from "../components/TableComponent";

const classSchema = [
  { label: "Class Name", name: "name", type: "text" },
  { label: "Year", name: "year", type: "number" },
  { label: "Teacher", name: "teacher", type: "select" },
  { label: "Student Fees", name: "studentFees", type: "number" },
  { label: "Students", name: "students", type: "select-multiple" },
  { label: "Student Limit", name: "studentLimit", type: "number" },
];

const ClassManagement = () => {
  const { teachers, students, baseURL, recordsPerPage } = useDataContext();
  const [classes, setClasses] = useState([]);
  const [currentClass, setCurrentClass] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchClasses = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseURL}/classes`, {
        params: { page: currentPage, limit: recordsPerPage },
      });

      setClasses(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, recordsPerPage]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const handleAddClass = () => {
    setCurrentClass(null);
    setIsFormVisible(true);
  };

  const handleEditClass = (classData) => {
    setCurrentClass(classData);
    setIsFormVisible(true);
  };

  const handleDeleteClass = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`${baseURL}/api/classes/${id}`);
      fetchClasses();
      toast.success("Class deleted successfully");
    } catch (error) {
      console.error("Error deleting class:", error);
      toast.error("Error deleting the class!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    try {
      if (currentClass) {
        await axios.put(`${baseURL}/api/classes/${currentClass._id}`, formData);
        toast.success("Class updated successfully");
      } else {
        await axios.post(`${baseURL}/api/classes`, formData);
        toast.success("New class created successfully");
      }
      fetchClasses();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting the form!");
    } finally {
      setIsFormVisible(false);
      setIsLoading(false);
    }
  };

  const handleFormCancel = () => {
    setIsFormVisible(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">
        Class Management
      </h1>
      {isLoading ? (
        <p className="text-gray-600">Loading...</p>
      ) : isFormVisible ? (
        <FormComponent
          modelSchema={classSchema}
          formData={currentClass}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          dynamicOptions={{ teacher: teachers, students: students }}
        />
      ) : (
        <div>
          <button
            onClick={handleAddClass}
            className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Add Class
          </button>
          <TableComponent
            modelSchema={classSchema}
            data={classes}
            onEdit={handleEditClass}
            onDelete={handleDeleteClass}
            dynamicOptions={{ teacher: teachers, students: students }}
            currentPage={currentPage}
            totalPages={totalPages}
            recordsPerPage={recordsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ClassManagement;
