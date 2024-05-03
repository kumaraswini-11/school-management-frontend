import React, { useState, useEffect } from "react";
import axios from "axios";
import { AnalyticsPage, GenericManagementComponent } from "../components";

function TeacherManagementPage() {
  const [allClasses, setAllClasses] = useState([]);
  const pageTitle = "Teacher Dashboard";

  const columns = [
    { key: "_id", title: "Serial No." },
    { key: "name", title: "Teacher Name" },
    { key: "gender", title: "Sex" },
    { key: "dob", title: "Date Of Birth" },
    { key: "contactDetails", title: "Contact Details" },
    { key: "salary", title: "Salary" },
    { key: "tassignedClass", title: "Assigned Class" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const teachersUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/teachers`;
      const classesUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/all-classes-name`;

      const [teachersResponse, classesResponse] = await Promise.all([
        axios.get(teachersUrl),
        axios.get(classesUrl),
      ]);

      setAllClasses(classesResponse.data.classes);

      return {
        data: teachersResponse.data.teachers,
        totalPages: teachersResponse.data.totalPages,
      };
    } catch (error) {
      throw new Error("Error fetching data");
    }
  };

  const initialFormData = {
    name: "",
    gender: "",
    dob: "",
    email: "",
    salary: "",
    class: "",
  };

  const inputFields = [
    {
      label: "Teacher Name",
      name: "name",
      type: "text",
      placeholder: "Enter teacher name",
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
      label: "Salary",
      name: "salary",
      type: "number",
      placeholder: "Enter Annual salary",
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
        fetchDataFunction={fetchData}
        fromPage="teachers"
        initialFormData={initialFormData}
        inputFields={inputFields}
      />
      <AnalyticsPage />
    </>
  );
}

export default TeacherManagementPage;
