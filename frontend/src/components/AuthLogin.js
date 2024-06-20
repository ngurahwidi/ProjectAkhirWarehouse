import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

async function checkLoginStatus() {
  try {
    const response = await axios.get('http://localhost:5000/loginStatus',{
        withCredentials:true
    });
    console.log(response.data)
    return response.data; // Mengembalikan data status login dari API
  } catch (error) {
    console.error('Error:', error);
    return false; // Mengembalikan false jika terjadi error
  }
}

function AuthLogin(Component) {
  return function AuthenticatedComponent(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchLoginStatus = async () => {
        try {
          const isLoggedIn = await checkLoginStatus();
          setIsLoggedIn(isLoggedIn);
        } catch (error) {
          console.error('Error fetching login status:', error);
          setIsLoggedIn(false);
        } finally {
          setIsLoading(false);
        }
      };

      fetchLoginStatus();
    }, []);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return !isLoggedIn ? <Component {...props} /> : <Navigate to="/dashboard" />;
  };
}

export default AuthLogin;
