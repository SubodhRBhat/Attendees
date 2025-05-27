import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../store/student-auth-token";
import { Navigate } from "react-router-dom";
import { Loading } from "../components/Loader";

export const AdminPanel = () => {
  const { student, isLoading } = useAuth();
  if (isLoading) {
    return <Loading />;
  }
  if (!student.isAdmin) {
    return <Navigate to="/dashboard"></Navigate>;
  }
  return (
    <>
      <h1 className="text-4xl font-bold text-center my-4">Admin Panel</h1>
      <header className="bg-gray-800 text-white">
        <nav className="container mx-auto p-4">
          <ul className="flex space-x-4 justify-center">
            <li>
              <NavLink
                to="/admin/students"
                className="px-3 py-2 rounded hover:bg-gray-700"
                activeClassName="bg-gray-700"
              >
                Students
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/students-attendence"
                className="px-3 py-2 rounded hover:bg-gray-700"
                activeClassName="bg-gray-700"
              >
                Students Attendence
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/students-leave"
                className="px-3 py-2 rounded hover:bg-gray-700"
                activeClassName="bg-gray-700"
              >
                Students Leave
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};
