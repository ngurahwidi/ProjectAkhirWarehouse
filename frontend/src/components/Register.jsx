import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLogin from "./AuthLogin";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/register", {
        email: email,
        password: password,
        name : nama
      });

      if (response && response.data) {
        console.log(response.data);
        navigate("/dashboard"); // Navigate to the dashboard
      } else {
        console.error("Invalid response from server");
        // Handle invalid response from server
        setError("Invalid response from server");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // If the error is from the server response
        console.error(error.response.data.message);
        setError(error.response.data.message); // Set error message from server
      } else {
        console.error("Network error:", error.message);
        setError("Network error occurred"); // Set generic network error message
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center sm:py-12 px-6 lg:px-8"
      style={{ backgroundImage: `url("/gambar/gudanglaptop.jpeg")` }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Tambahkan logo di sini */}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="text-center text-3xl font-extrabold text-blue-500">
            Register
          </h2>
          <img
            src="/gambar/SST.png"
            alt="Logo"
            className="mx-auto mb-4"
            style={{ width: "200px" }}
          />
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Nama
              </label>
              <div className="mt-1">
                <input
                  id="nama"
                  name="nama"
                  type="text"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50 text-gray-900"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50 text-gray-900"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50 text-gray-900"
                />
              </div>
            </div>

            {/* Menampilkan pesan kesalahan jika ada */}
            {error && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
              <p className="text-center mt-4 "> Sudah Punya Account? <a href="/" className="text-blue-600 hover:text-gray-600" > Login Disini</a></p>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin(Register);