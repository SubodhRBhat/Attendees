import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/student-auth-token';
import { Loading } from '../components/Loader';

export const LeaveData = () => {
  const { token } = useAuth();
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/admin/students-leave`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch leave data');
        }
        const data = await response.json();
        setLeaveData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leave data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaveData();
  }, [token]);

  const handleApprove = (id) => {
    // Implement approve logic here
    console.log(`Approve request with ID: ${id}`);
  };

  const handleReject = (id) => {
    // Implement reject logic here
    console.log(`Reject request with ID: ${id}`);
  };

  if (loading) {
    return <div><Loading/></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">View Leave Requests</h1>

        <div className="max-w-full overflow-x-auto">
          <table className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4">Student ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Message</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveData.map((entry, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-3 px-4">{entry.studentId}</td>
                  <td className="py-3 px-4">{entry.name}</td>
                  <td className="py-3 px-4">{entry.email}</td>
                  <td className="py-3 px-4">{entry.phone}</td>
                  <td className="py-3 px-4">{entry.message}</td>
                  <td className="py-3 px-4">{new Date(entry.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleApprove(entry._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(entry._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
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
