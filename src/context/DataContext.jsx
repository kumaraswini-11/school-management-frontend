import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = `${import.meta.env.VITE_BASE_URL}/api`;
  const recordsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          `${baseURL}/classes`,
          `${baseURL}/teachers`,
          `${baseURL}/students`,
        ];

        const requests = urls.map((url) => axios.get(url));

        const responses = await axios.all(requests);

        const [classesResponse, teachersResponse, studentsResponse] = responses;

        setClasses(classesResponse.data.data);
        setTeachers(teachersResponse.data.data);
        setStudents(studentsResponse.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [baseURL]);

  return (
    <DataContext.Provider
      value={{
        classes,
        teachers,
        students,
        isLoading,
        error,
        baseURL,
        recordsPerPage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
