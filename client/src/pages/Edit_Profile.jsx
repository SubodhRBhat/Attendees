import React from 'react';
import { useAuth } from '../store/student-auth-token';
import { Loading } from '../components/Loader';

export const Edit_Profile = () => {
    const { student, isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <div className='text-4xl text-center mt-72 font-semibold'>Please Sign in to Access Profile!</div>;
    }

    if (!student) {
        return <Loading />;
    }

    return (
        <div className="bg-gray-100 h-screen">
            <div className="container mx-auto py-10">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <div className="flex items-center space-x-4">
                        <img
                            className="w-24 h-24 rounded-full border-2 border-blue-500"
                            src="https://via.placeholder.com/150"
                            alt="User Avatar"
                        />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>
                            <p className="text-gray-600">{student.email}</p>
                            <p className="text-gray-600">{student.address}</p>
                        </div>
                    </div>
                  
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                                    value={student.name}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                                    value={student.email}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Phone</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                                    value={student.phone}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Location</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                                    value={student.address}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
