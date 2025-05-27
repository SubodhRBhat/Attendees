import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/student-auth-token';
import { Loading } from '../components/Loader';

export const ViewAttendance = () => {
    const { token, isLoggedIn } = useAuth();
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);

    if (!isLoggedIn) {
        return <div className='text-4xl text-center mt-72 font-semibold'>Please Sign in to Access View Attendance!</div>;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/user/view-attendance', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch attendance data');
                }

                const data = await response.json();
                setAttendanceData(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const presentCount = attendanceData.filter(entry => entry.isPresent).length;
    const absentCount = attendanceData.filter(entry => !entry.isPresent).length;

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">View Attendance</h1>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4">Student ID</th>
                                <th className="py-2 px-4">Date</th>
                                <th className="py-2 px-4">Attendance Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData.map((entry, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="py-2 px-4">{entry.studentId}</td>
                                    <td className="py-2 px-4">{new Date(entry.date).toLocaleDateString()}</td>
                                    <td className="py-2 px-4">{entry.isPresent ? 'Present' : 'Absent'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Attendance Overview</h2>
                    <div className="bg-white rounded-lg p-4 shadow-lg">
                        <div className="flex items-center justify-center">
                            <div className="bg-blue-500 rounded-l-full h-8" style={{ width: `${(presentCount / attendanceData.length) * 100}%` }}></div>
                            <div className="bg-red-500 rounded-r-full h-8" style={{ width: `${(absentCount / attendanceData.length) * 100}%` }}></div>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="text-sm text-gray-700">Present: {presentCount}</span>
                            <span className="text-sm text-gray-700">Absent: {absentCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
