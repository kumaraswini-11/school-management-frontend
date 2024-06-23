import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import FormComponent from "../components/FormComponent";
import TableComponent from "../components/TableComponent";
import { useDataContext } from "../context/DataContext";

const teacherSchema = [
  { label: "Name", name: "name", type: "text" },
  { label: "Date of Birth", name: "dob", type: "date" },
  { label: "Gender", name: "gender", type: "select" },
  { label: "Email", name: "contactDetails.email", type: "email" },
  { label: "Phone", name: "contactDetails.phone", type: "text" },
  { label: "Salary", name: "salary", type: "number" },
  { label: "Classes", name: "classes", type: "select-multiple" },
];

const TeacherManagement = () => {
  const { classes, baseURL, recordsPerPage } = useDataContext();
  const [teachers, setTeachers] = useState([]);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTeachers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseURL}/teachers`, {
        params: { page: currentPage, limit: recordsPerPage },
      });

      setTeachers(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, recordsPerPage]);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const handleAddTeacher = () => {
    setCurrentTeacher(null);
    setIsFormVisible(true);
  };

  const handleEditTeacher = (teacherData) => {
    setCurrentTeacher(teacherData);
    setIsFormVisible(true);
  };

  const handleDeleteTeacher = async (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      setIsLoading(true);
      try {
        await axios.delete(`${baseURL}/teachers/${id}`);
        fetchTeachers();
        toast.success("Teacher deleted successfully");
      } catch (error) {
        console.error("Error deleting teacher:", error);
        toast.error("Error deleting the teacher!");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    try {
      if (currentTeacher) {
        await axios.put(`${baseURL}/teachers/${currentTeacher._id}`, formData);
        toast.success("Teacher updated successfully");
      } else {
        await axios.post(`${baseURL}/teachers`, formData);
        toast.success("New teacher created successfully");
      }
      fetchTeachers();
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
        Teacher Management
      </h1>
      {isLoading ? (
        <p className="text-gray-600">Loading...</p>
      ) : isFormVisible ? (
        <FormComponent
          modelSchema={teacherSchema}
          formData={currentTeacher}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          dynamicOptions={{
            gender: [
              { _id: "male", name: "Male" },
              { _id: "female", name: "Female" },
            ],
            classes: classes,
          }}
        />
      ) : (
        <div>
          <button
            onClick={handleAddTeacher}
            className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Add Teacher
          </button>
          <TableComponent
            modelSchema={teacherSchema}
            data={teachers}
            onEdit={handleEditTeacher}
            onDelete={handleDeleteTeacher}
            dynamicOptions={{
              gender: [
                { _id: "male", name: "Male" },
                { _id: "female", name: "Female" },
              ],
              classes: classes,
            }}
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

export default TeacherManagement;
