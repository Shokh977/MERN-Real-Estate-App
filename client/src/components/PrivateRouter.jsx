import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthStore";
import { FaSpinner } from "react-icons/fa6";

const PrivateRouter = ({ children }) => {
  const { user, loading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth(); 
  }, [checkAuth]);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <FaSpinner className="mx-auto text-4xl animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default PrivateRouter;
