import React, { useState } from 'react';
import { useAuth } from '../store/student-auth-token';
import {Loading} from '../components/Loader';
import { toast} from 'react-toastify';

export const MarkLeave = () => {
    const {student,isLoggedIn} = useAuth();
    const{token} = useAuth();

    if(!isLoggedIn){

        return <div className='text-4xl text-center mt-72 font-semibold'>Please Sign in to Access MarkLeave!</div>

    }
    

    if (!student) {
        return <div><Loading/></div>;
    }

    const [formData, setFormData] = useState({
        name: student.name,
        email: student.email,
        phone: student.phone,
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/user/mark-leave', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setFormData({
                    name: student.name,
                    email: student.email,
                    phone: student.phone,
                    message: ''
                });
                toast.success('Leave request submitted successfully');
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to submit leave request');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-96">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Mark Leave</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            readOnly
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            readOnly
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-700">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Submit Leave Request
                    </button>
                </form>
            </div>
        </div>
    );
};
