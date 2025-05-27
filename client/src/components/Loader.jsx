import React from "react";
import "../style/Loader.css";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="spinner"></div>
    </div>
  );
};
