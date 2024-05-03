import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PageLoader, ClassGraph } from "./components";
import "./index.css";

// Lazy-loaded components
const Root = lazy(() => import("./App.jsx"));
const Class = lazy(() => import("./pages/ClassManagementPage.jsx"));
const Teacher = lazy(() => import("./pages/TeacherManagementPage.jsx"));
const Student = lazy(() => import("./pages/StudentManagementPage.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Navigate to="/class" />,
      },
      {
        path: "class",
        element: <Class />,
      },

      {
        path: "teacher",
        element: <Teacher />,
        // loader: ({ request }) =>
        //   fetch("/api/dashboard.json", {
        //     signal: request.signal,
        //   }),
      },
      {
        path: "student",
        element: <Student />,
      },
    ],
  },
  {
    path: "class-graph/:id",
    element: <ClassGraph />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense fallback={<PageLoader />}>
    <RouterProvider router={router} />
    <ToastContainer></ToastContainer>
  </Suspense>
);
