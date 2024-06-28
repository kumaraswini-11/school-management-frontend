import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormComponent from "../components/FormComponent";
import TableComponent from "../components/TableComponent";
import { useDataContext } from "../context/DataContext";
import { destructureContactDetails } from "../utils/helpers";

const studentSchema = [
  { label: "Name", name: "name", type: "text" },
  { label: "Date of Birth", name: "dob", type: "date" },
  { label: "Gender", name: "gender", type: "select" },
  { label: "Email", name: "email", type: "email" },
  { label: "Phone", name: "phone", type: "text" },
  { label: "Fees Paid", name: "feesPaid", type: "number" },
  { label: "Class", name: "class", type: "select-multiple" },
];

const StudentManagement = () => {
  const { classes, baseURL, recordsPerPage } = useDataContext();
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseURL}/students`, {
        params: { page: currentPage, limit: recordsPerPage },
      });

      setStudents(destructureContactDetails(response.data.data));
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Error fetching students!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [currentPage, recordsPerPage, baseURL]);

  const handleAddStudent = () => {
    setCurrentStudent(null);
    setIsFormVisible(true);
  };

  const handleEditStudent = (studentData) => {
    setCurrentStudent(studentData);
    setIsFormVisible(true);
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setIsLoading(true);
      try {
        await axios.delete(`${baseURL}/students/${id}`);
        fetchStudents();
        toast.success("Student deleted successfully");
      } catch (error) {
        console.error("Error deleting student:", error);
        toast.error("Error deleting the student!");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    try {
      if (currentStudent) {
        await axios.put(`${baseURL}/students/${currentStudent._id}`, formData);
        toast.success("Student updated successfully");
      } else {
        await axios.post(`${baseURL}/students`, formData);
        toast.success("New student created successfully");
      }
      fetchStudents();
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
        Student Management
      </h1>
      {isLoading ? (
        <p className="text-gray-600">Loading...</p>
      ) : isFormVisible ? (
        <FormComponent
          modelSchema={studentSchema}
          formData={currentStudent}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          dynamicOptions={{
            gender: [
              { _id: "Male", name: "Male" },
              { _id: "Female", name: "Female" },
            ],
            class: classes,
          }}
        />
      ) : (
        <div>
          <button
            onClick={handleAddStudent}
            className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Add Student
          </button>
          <TableComponent
            modelSchema={studentSchema}
            data={students}
            onEdit={handleEditStudent}
            onDelete={handleDeleteStudent}
            dynamicOptions={{
              gender: [
                { _id: "Male", name: "Male" },
                { _id: "Female", name: "Female" },
              ],
              class: classes,
            }}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
