import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/Authenticate", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data === true) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  // Still checking
  if (isAuthenticated === null) {
    return <h2>Checking authentication...</h2>;
  }

  // User is already logged in
  if (isAuthenticated) {
    return <Navigate to="/JobPage" replace />;
  }

  // User is NOT logged in
  return <Outlet />;
};

export default PublicRoute;