import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// async function checkLoginStatus() {
//   try {
//     const response = await axios.get('http://localhost:5000/loginStatus');
//     console.log(response.data)
//     return response.data; 
//   } catch (error) {
//     console.error('Error:', error);
//     return false;
//   }
// }

async function checkLoginStatus() {
  try {
    // Secara sederhana, kita bisa mengasumsikan pengguna sudah login
    // atau tidak dengan menggunakan state lokal
    const isLoggedIn = true
    return isLoggedIn;
  } catch (error) {
    console.error('Error:', error);
    return false; // Mengembalikan false jika terjadi error
  }
}

// HOC untuk melindungi rute yang memerlukan autentikasi
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchLoginStatus = async () => {
        const isLoggedIn = await checkLoginStatus();
        setIsLoggedIn(isLoggedIn);
        setIsLoading(false);
      };

      fetchLoginStatus();
    }, []);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return isLoggedIn ? <Component {...props} /> : <Navigate to="/" />;
  };
}

export default withAuth;
