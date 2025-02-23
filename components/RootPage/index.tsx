"use client";
import Login from "@/app/auth/login";
import Dashboard from "@/app/dashboard/dashboard";
import { useEffect, useState } from "react";

const RootPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if the user is authenticated (example: check localStorage or cookie)
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  if (isAuthenticated) {
    return <Login/>;
  }

  return <Dashboard />;
};

export default RootPage;