"use client";
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
    return <h5>Home</h5>;
  }

  return <h5>Login</h5>;
};

export default RootPage;