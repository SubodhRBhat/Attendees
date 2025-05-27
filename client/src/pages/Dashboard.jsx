import React, { useEffect, useState } from 'react';
import { Loading } from '../components/Loader';
import { useAuth } from '../store/student-auth-token';

export const Dashboard = () => {
    const { token } = useAuth();
    const [attendanceData, setAttendanceData] = useState([]);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/user/dashboard', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch dashboard data');
                }

                const data = await response.json();
                setAttendanceData(data.attendanceData);
                setLeaveRequests(data.leaveRequests);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch dashboard data. Please try again later.');
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="text-red-600">{error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Attendance Record</h2>
                {attendanceData.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-2 px-4 border-b border-gray-200">Date</th>
                                    <th className="py-2 px-4 border-b border-gray-200">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceData.map((attendance) => (
                                    <tr key={attendance._id}>
                                        <td className="py-2 px-4 border-b border-gray-200">{new Date(attendance.date).toLocaleDateString()}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{attendance.isPresent ? 'Present' : 'Absent'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-600">No attendance records found.</p>
                )}
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Leave Requests</h2>
                {leaveRequests.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-2 px-4 border-b border-gray-200">Date</th>
                                    <th className="py-2 px-4 border-b border-gray-200">Name</th>
                                    <th className="py-2 px-4 border-b border-gray-200">Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaveRequests.map((leave) => (
                                    <tr key={leave._id}>
                                        <td className="py-2 px-4 border-b border-gray-200">{new Date(leave.date).toLocaleDateString()}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{leave.name}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{leave.message}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-600">No leave requests found.</p>
                )}
            </div>
        </div>
    );
};
