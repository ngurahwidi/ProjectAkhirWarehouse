import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoBag, IoBagAdd, IoBagRemove, IoExit } from "react-icons/io5";

const Sidebar = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar cok */}
            <div className="bg-gray-800 text-white w-64 flex flex-col">
                <img src="/gambar/SST.png" alt="Logo" className="mx-auto" style={{ width: '150px' }} />
                <ul className="p-2 flex-1">
                    <li className="mb-2">
                        <NavLink to={"/products"} className="p-2 hover:bg-gray-700 flex gap-2 items-center"><IoBag/>List Barang</NavLink>
                    </li>
                    <li className="mb-2">
                    <NavLink to={"/barangMasuk"} className="block p-2 hover:bg-gray-700 flex gap-2 items-center"><IoBagAdd />Barang Masuk</NavLink>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="block p-2 hover:bg-gray-700 flex gap-2 items-center"><IoBagRemove />Barang Keluar</a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="block p-2 hover:bg-gray-700 flex gap-2 items-center"><IoExit />Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
