import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [student, setStudent] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const storeTokenInLS = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const studentAuthentication = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/user/edit-profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStudent(data.userProfileData);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch user data", response.status);
      }
    } catch (error) {
      console.error("Error fetching user data", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    studentAuthentication();
  }, [token]);

  const userLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  let isLoggedIn = !!token;

  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        userLogout,
        isLoggedIn,
        student,
        token,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
