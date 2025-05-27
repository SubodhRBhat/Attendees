import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from "../store/student-auth-token";

export const EditStudent = () => {
    const { student_id } = useParams();
    const { token } = useAuth();
    const [updateStudent, setUpdateStudent] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/admin/students/${student_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const responseText = await response.text();
                    console.error("Received non-JSON response:", responseText);
                    throw new Error("Failed to fetch student data");
                }

                const data = await response.json();
                setUpdateStudent(data);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchStudentData();
    }, [student_id, token]);

    const handleInput = (e) => {
        setUpdateStudent({
            ...updateStudent,
            [e.target.name]: e.target.value,
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/admin/students/update/${student_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updateStudent),
            });

            if (!response.ok) {
                const responseData = await response.json();
                toast.error(responseData.message);
                return;
            }

            toast.success('Student Updated Successfully');
            navigate('/admin/students');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Student</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            required
                            value={updateStudent.name}
                            onChange={handleInput}
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={updateStudent.email}
                            onChange={handleInput}
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            required
                            value={updateStudent.phone}
                            onChange={handleInput}
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            required
                            value={updateStudent.address}
                            onChange={handleInput}
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
