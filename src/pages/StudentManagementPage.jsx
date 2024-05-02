import React, { useState } from "react";
import axios from "axios";
import { GenericManagementComponent } from "../components";

function StudentManagementPage() {
  const [allClasses, setAllClasses] = useState([]);

  const pageTitle = "Student Dashboard";

  // Define columns for the table
  const columns = [
    { key: "_id", title: "Serial No." },
    { key: "name", title: "Student Name" },
    { key: "gender", title: "Sex" },
    { key: "dob", title: "Date Of Birth" },
    { key: "contactDetails", title: "Contact Details" },
    { key: "feesPaid", title: "Paid Amount" },
  ];

  const fetchDataFunction = async (params) => {
    try {
      const studentsUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/students`;
      const classesUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/all-classes-name`;

      const studentsResponse = await axios.get(studentsUrl, { params });
      const classesResponse = await axios.get(classesUrl);

      setAllClasses(classesResponse.data.classes);

      return {
        data: studentsResponse.data.students,
        totalPages: studentsResponse.data.totalPages,
      };
    } catch (error) {
      throw new Error("Error fetching data");
    }
  };

  const initialFormData = {
    studentName: "",
    gender: "",
    dob: "",
    email: "",
    paid: 0,
    class: "",
  };

  const inputFields = [
    {
      label: "Student Name",
      name: "studentName",
      type: "text",
      placeholder: "Enter student name",
    },
    {
      label: "Gender",
      name: "gender",
      type: "select",
      placeholder: "Choose Gender",
      options: [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
      ],
    },
    {
      label: "Date Of Birth",
      name: "dob",
      type: "date",
      placeholder: "Enter date of birth",
    },
    {
      label: "Email",
      name: "email",
      type: "text",
      placeholder: "Enter Email",
    },
    {
      label: "Amount Paid",
      name: "paid",
      type: "number",
      placeholder: "Enter amount",
    },
    {
      label: "Classes",
      name: "class",
      type: "select",
      placeholder: "Select Class",
      options: allClasses.map((classItem) => ({
        value: classItem._id,
        label: classItem.className,
      })),
    },
  ];

  return (
    <>
      <GenericManagementComponent
        pageTitle={pageTitle}
        columns={columns}
        fetchDataFunction={fetchDataFunction}
        fromPage="students"
        initialFormData={initialFormData}
        inputFields={inputFields}
      />
    </>
  );
}

export default StudentManagementPage;
