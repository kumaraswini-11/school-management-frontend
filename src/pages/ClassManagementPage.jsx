import React, { useState } from "react";
import axios from "axios";
import { GenericManagementComponent } from "../components";

function ClassManagementPage() {
  const [allTeacher, setAllTeacher] = useState([]);
  const [allStudent, setAllStudent] = useState([]);

  // Define page title

  const pageTitle = "Classes Dashboard";

  // Define columns for the table
  const columns = [
    { key: "_id", title: "Serial No." },
    { key: "className", title: "Class Name" },
    { key: "year", title: "Year" },
    { key: "studentFees", title: "Student Fees" },
    { key: "limitStudents", title: "Max Students / Class" },
  ];

  const fetchDataFunction = async (params) => {
    try {
      const baseUrl = ` ${import.meta.env.VITE_BASE_URL}/api/v1`;
      const classUrl = `${baseUrl}/classes`;
      const teacherUrl = `${baseUrl}/all-teachers-name`;
      const studentUrl = `${baseUrl}/all-student-name`;

      const teacherResponse = await axios.get(teacherUrl);
      const studentResponse = await axios.get(studentUrl);
      const classResponse = await axios.get(classUrl, { params });

      setAllTeacher(teacherResponse.data.teachers);
      setAllStudent(studentResponse.data.students);

      return {
        data: classResponse.data.classes,
        totalPages: classResponse.data.totalPages,
      };
    } catch (error) {
      throw new Error("Error fetching data");
    }
  };

  const initialFormData = {
    className: "",
    classFee: "",
    maxLimit: "",
    teacherAssigned: "",
    students: [],
  };

  const inputFields = [
    {
      label: "Class Name",
      name: "className",
      type: "text",
      placeholder: "Enter class name",
    },
    {
      label: "Class Fee",
      name: "classFee",
      type: "number",
      placeholder: "Enter class fee",
    },
    {
      label: "Max Limit",
      name: "maxLimit",
      type: "number",
      placeholder: "Enter max limit",
    },
    {
      label: "Teacher Assigned",
      name: "teacherAssigned",
      type: "select",
      placeholder: "Select teacher",
      options: allTeacher?.map((item) => ({
        value: item._id,
        label: item.name,
      })),
    },
    {
      label: "Assigned Students",
      name: "students",
      type: "select",
      placeholder: "Select Students",
      options: allStudent?.map((item) => ({
        value: item._id,
        label: item.name,
      })),
    },
  ];

  return (
    <GenericManagementComponent
      pageTitle={pageTitle}
      columns={columns}
      fetchDataFunction={fetchDataFunction}
      fromPage="classes"
      initialFormData={initialFormData}
      inputFields={inputFields}
    />
  );
}

export default ClassManagementPage;
