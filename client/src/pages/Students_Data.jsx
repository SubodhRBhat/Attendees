import React, { useEffect, useState } from "react";
import { useAuth } from "../store/student-auth-token";
import { Loading } from "../components/Loader";
import { toast } from "react-toastify";
import { EditStudent } from "../pages/EditStudent";
import { Link } from "react-router-dom";

export const Students_Data = () => {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/admin/students/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student._id !== id)
        );
        toast.success("Student deleted successfully");
      } else {
        const errorText = await response.text();
        toast.error(`Failed to delete student: ${errorText}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:5000/admin/students", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        } else {
          const errorText = await response.text();

          setError("Failed to fetch students");
        }
      } catch (error) {
        setError("An error occurred while fetching students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [token]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{student._id}</td>
                  <td className="py-2 px-4 border-b">{student.name}</td>
                  <td className="py-2 px-4 border-b">{student.email}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>

                    <Link
                      to={`/admin/students/update/${student._id}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
