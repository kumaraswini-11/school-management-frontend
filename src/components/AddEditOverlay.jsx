import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";

function AddEditOverlay({
  initialFormData,
  inputFields,
  isVisible,
  itemId,
  fromPage,
  onCancel,
  onSubmit,
}) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/${fromPage}/${itemId}`
        );
        console.log(response);

        let newInitialFormData = null;
        if (fromPage.includes("student")) {
          const student = response.data.student;
          newInitialFormData = {
            studentName: student.name || "",
            gender: student.gender || "",
            dob: student.dob
              ? new Date(student.dob).toISOString().slice(0, 10)
              : "",
            email: student.contactDetails || "",
            paid: student.feesPaid || 0,
            class: initialFormData.class,
          };
        } else if (fromPage.includes("teacher")) {
          const teacher = response.data.teacher;
          newInitialFormData = {
            name: teacher.name || "",
            gender: teacher.gender || "",
            dob: teacher.dob
              ? new Date(teacher.dob).toISOString().slice(0, 10)
              : "",
            email: teacher.contactDetails || "",
            salary: teacher.salary || 0,
            class: initialFormData.class,
          };
        } else {
          const classes = response.data.classes;
          setSelectedStudents(classes?.students ?? []);

          newInitialFormData = {
            className: classes.className || "",
            classFee: classes.studentFees || "",
            maxLimit: classes.limitStudents || 0,
            teacherAssigned: classes.teacher || initialFormData.teacherAssigned,
            students: initialFormData.students,
          };
        }

        setFormData(newInitialFormData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [itemId]);

  const handleChange = (e, field) => {
    const tempStudents =
      field.name.includes("student") &&
      fromPage.includes("class") &&
      field.type === "select"
        ? e.map((item) => item.value)
        : "";

    const value = field.name.includes("student")
      ? tempStudents
      : field.type === "select"
        ? e.value
        : e.target.value;

    setFormData({
      ...formData,
      [field.name]: value,
    });

    // Clear error message when user starts typing in the field
    setErrors({
      ...errors,
      [field.name]: "",
    });
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    onCancel();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "paid" && key !== "students") {
        validationErrors[key] = `${key} is required`;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      onSubmit(formData);
      setFormData(initialFormData);
    }
  };

  return isVisible ? (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              {/* Form inputs */}
              {inputFields.map((field, index) => (
                <div key={index} className="mb-4">
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <Select
                      options={field.options}
                      name={field.name}
                      id={field.name}
                      value={field.options.find(
                        (option) => option.value === formData[field.name]
                      )}
                      defaultValue={
                        selectedStudents && itemId
                          ? initialFormData?.students.find(
                              (option) =>
                                option.value === selectedStudents.value
                            )
                          : ""
                      }
                      onChange={(selectedOption) =>
                        handleChange(
                          // selectedStudents
                          //   // ? [...selectedOption]
                          //   :
                          selectedOption,
                          field
                        )
                      }
                      placeholder={field.placeholder}
                      className={`mt-1 sm:text-md border-gray-500 border-1 ${fromPage.includes("class") ? "basic-multi-select" : ""} ${
                        errors[field.name] ? " border-red-500" : ""
                      }`}
                      isMulti={
                        selectedStudents &&
                        fromPage.includes("class") &&
                        field.name.includes("student")
                      }
                      classNamePrefix={
                        selectedStudents &&
                        fromPage.includes("class") &&
                        "select"
                      }
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      id={field.name}
                      value={formData[field.name]}
                      onChange={(selectedOption) =>
                        handleChange(selectedOption, field)
                      }
                      placeholder={field.placeholder}
                      className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-500 border-1 rounded-md p-3 ${
                        errors[field.name] ? "border-red-500" : ""
                      }`}
                    />
                  )}
                  {errors[field.name] && (
                    <p className={`mt-1 text-xs text-red-500`}>
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                aria-label="Submit"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="mt-3 w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                aria-label="Cancel"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : null;
}

export default AddEditOverlay;
