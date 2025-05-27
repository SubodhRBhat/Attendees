import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Logout } from './pages/Logout';
import { Edit_Profile } from './pages/Edit_Profile';
import { MarkAttendance } from './pages/MarkAttendance';
import { MarkLeave } from './pages/MarkLeave';
import { ViewAttendance } from './pages/View_Attendence';
import { Error } from './pages/Error';
import { AdminPanel } from './pages/AdminPannel';
import { AttendenceData } from './pages/Attendence_Data';
import { LeaveData } from './pages/Leave_Data';
import { Students_Data } from './pages/Students_Data';
import { EditStudent } from './pages/EditStudent';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/user-signup' element={<Signup />} />
          <Route path='/user-signin' element={<Signin />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/edit-profile' element={<Edit_Profile />} />
          <Route path='/mark-attendance' element={<MarkAttendance />} />
          <Route path='/mark-leave' element={<MarkLeave />} />
          <Route path='/view-attendence' element={<ViewAttendance />} />
          <Route path='/admin' element={<AdminPanel />}>
            <Route path='/admin/students' element={<Students_Data />} />
            <Route path='/admin/students-attendence' element={<AttendenceData />} />
            <Route path='/admin/students-leave' element={<LeaveData />} />
            <Route path='/admin/students/update/:student_id' element={<EditStudent />} />
          </Route>
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
