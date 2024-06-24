import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoBag, IoBagAdd, IoBagRemove, IoExit } from "react-icons/io5";
import { FaUserTag, FaUserTie } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import axios from "axios";

const Sidebar = () => {

   const navigate = useNavigate()
   const handleLogout = async ( event ) =>{
    try {
      const response = await axios.get("http://localhost:5000/logout",{
        withCredentials : true, 
      })
      console.log(response.data)
      document.cookie ="token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/")

    } catch (error) {
      if(error.response && error.response.data)
        {
          console.error(error.response.data.message)
        } else {
          console.log("Network Error : " , error.message)
        }
    }
   }
  return (
    <div className="flex h-screen fixed ">
      {/* Sidebar cok */}
      <div className="bg-gray-800 text-white w-64 flex flex-col">
        <img
          src="/gambar/SST.png"
          alt="Logo"
          className="mx-auto"
          style={{ width: "150px" }}
        />
        <ul className="p-2 flex-1">
          <li className="mb-2">
            <NavLink
              to={"/dashboard"}
              className="p-2 hover:bg-gray-700 flex gap-2 items-center"
            >
              <MdDashboard />
              Dashboard
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to={"/customers"}
              className="p-2 hover:bg-gray-700 flex gap-2 items-center"
            >
              <FaUserTag />
              Customers
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to={"/suppliers"}
              className="p-2 hover:bg-gray-700 flex gap-2 items-center"
            >
              <FaUserTie />
              Suppliers
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to={"/products"}
              className="p-2 hover:bg-gray-700 flex gap-2 items-center"
            >
              <IoBag />
              List Barang
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to={"/barangMasuk"}
              className="block p-2 hover:bg-gray-700 flex gap-2 items-center"
            >
              <IoBagAdd />
              Barang Masuk
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to={"/barangKeluar"}
              className="block p-2 hover:bg-gray-700 flex gap-2 items-center"
            >
              <IoBagRemove />
              Barang Keluar
            </NavLink>
          </li>
          <li className="mb-2">
            <button
              onClick={handleLogout}
              className="block p-2 hover:bg-gray-700 flex gap-2 items-center"
            >
              <IoExit />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
