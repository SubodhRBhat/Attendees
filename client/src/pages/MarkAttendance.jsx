import React, { useState } from 'react';
import { useAuth } from '../store/student-auth-token';
import {Loading} from '../components/Loader';
import { toast} from 'react-toastify';


export const MarkAttendance = () => {

    const { student, isLoggedIn } = useAuth();
    if(!isLoggedIn){
        return <div className='text-4xl text-center mt-72 font-semibold'>Please Sign in to Access MarkAttendence!</div>

    }
    if (!student) {
        return <div><Loading/></div>;
    }
   
   
    const [attendanceStatus, setAttendanceStatus] = useState('');
    const [studentId, setStudentId] = useState(student._id);

    const handleStatusChange = (e) => {
        setAttendanceStatus(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/user/mark-attendance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isPresent: attendanceStatus === 'Present', studentId }),
            });
            if (response.ok) {
                setAttendanceStatus('');
                toast.success(`Attendance marked as ${attendanceStatus}`);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            toast.error(`Failed to mark attendance: ${error.message}`);
            setAttendanceStatus('');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-96">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Mark Attendance</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="block text-gray-700">Select Attendance Status</label>
                        <select
                            value={attendanceStatus}
                            onChange={handleStatusChange}
                            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>Select status</option>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Mark Attendance
                    </button>
                </form>
            </div>
        </div>
    );
};
