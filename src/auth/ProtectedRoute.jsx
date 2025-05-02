import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "@/api/axios";
import { jwtDecode } from "jwt-decode";
import Spinner from "@/components/Spinner";

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  
  useEffect(() => {
    authorized().catch(() => setIsAuthorized(false));
  }, []);

  async function refresh_token() {
    const refresh = localStorage.getItem("refresh");
    try {
      const response = await api.post(`refresh/`, { refresh });
      if (response.status === 200) {
        localStorage.setItem("access", response.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      setIsAuthorized(false);
      console.log(error);
    }
  }

  async function authorized() {
    const token = localStorage.getItem("access");
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const expire_date = decoded.exp;
    const date_time = Date.now() / 1000;
    if (date_time > expire_date) {
      refresh_token();
    } else {
      setIsAuthorized(true);
    }
  }

  if (isAuthorized === null) {
    return <Spinner />;
  }

  return isAuthorized ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
