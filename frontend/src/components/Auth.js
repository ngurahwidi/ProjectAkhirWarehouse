import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import './Spinner.css';

async function checkLoginStatus() {
  try {
    const response = await axios.get('http://localhost:5000/loginStatus', {
      withCredentials: true,
    });
    return response.data; 
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchLoginStatus = async () => {
        const MIN_LOADING_TIME = 500; 
        const startTime = Date.now();

        try {
          const isLoggedIn = await checkLoginStatus();
          setIsLoggedIn(isLoggedIn);
        } catch (error) {
          console.error('Error fetching login status:', error);
          setIsLoggedIn(false);
        } finally {
          const elapsedTime = Date.now() - startTime;
          const remainingTime = MIN_LOADING_TIME - elapsedTime;

          setTimeout(() => {
            setIsLoading(false);
          }, Math.max(0, remainingTime));
        }
      };

      fetchLoginStatus();
    }, []);

    if (isLoading) {
      return (
        <div className="spinner">
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
    }

    return isLoggedIn ? <Component {...props} /> : <Navigate to="/" />;
  };
}

export default withAuth;
