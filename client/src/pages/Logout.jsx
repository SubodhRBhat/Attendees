import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/student-auth-token';

export const Logout = () => {
    const navigate = useNavigate();
    const {userLogout} = useAuth();
  
    useEffect(()=>{
        userLogout();
    },[userLogout])
  
    return navigate("/user-signin")
        
}
