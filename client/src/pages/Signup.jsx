import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link from react-router-dom
import { useAuth } from "../store/student-auth-token";
import { toast} from 'react-toastify';

export const Signup = () => {
    const { storeTokenInLS } = useAuth();
    const [student, setStudent] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        isAdmin: false,
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
            const response = await fetch('http://localhost:5000/auth/user-signup', {
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
                    name: "",
                    email: "",
                    phone: "",
                    address: "",
                    password: "",
                    isAdmin: false,
                });
                toast.success('User registered successfully')
                navigate('/dashboard');
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
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            required
                            value={student.name}
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
                            value={student.email}
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
                            value={student.phone}
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
                            value={student.address}
                            onChange={handleInput}
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
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
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-sm text-gray-600 text-center">
                    Already have an account? <Link to="/user-signin" className="text-blue-500 hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
};
