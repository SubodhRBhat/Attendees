import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/student-auth-token";
import { toast} from 'react-toastify';

export const Signin = () => {
    const { storeTokenInLS } = useAuth();
    const [student, setStudent] = useState({
        email: "",
        password: "",
    });

    const handleInput = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/auth/user-signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            });

            const responseData = await response.json();

            if (response.ok) {
                storeTokenInLS(responseData.token);
                setStudent({
                    email: "",
                    password: "",
                });
                toast.success('User signed in successfully')
                navigate('/dashboard'); // Navigate after state reset
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            
           toast.error(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={student.email}
                            onChange={handleInput}
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            value={student.password}
                            onChange={handleInput}
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-sm text-gray-600 text-center">
                    Don't have an account? <NavLink to="/user-signup" className="text-blue-500 hover:underline">Sign Up</NavLink>
                </p>
            </div>
        </div>
    );
};
