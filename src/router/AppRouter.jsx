import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import Layout from "../components/Layout/Layout";

const Classes = lazy(() => import("../pages/ClassManagementPage"));
const Teachers = lazy(() => import("../pages/TeacherManagementPage"));
const Students = lazy(() => import("../pages/StudentManagementPage"));
const FinancialAnalytics = lazy(
  () => import("../pages/FinancialAnalyticsPage")
);
const ClassAnalytics = lazy(() => import("../pages/ClassAnalyticsPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "classes",
        element: <Classes />,
        children: [{ path: ":classId", element: <ClassAnalytics /> }],
      },
      { path: "teachers", element: <Teachers /> },
      { path: "students", element: <Students /> },
      { path: "financial-analytics", element: <FinancialAnalytics /> },
    ],
  },
]);

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRouter;
