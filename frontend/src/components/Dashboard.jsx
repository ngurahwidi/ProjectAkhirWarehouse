import React from 'react';

const Dashboard = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar cok */}
            <div className="bg-blue-700 text-white w-64 flex flex-col">
                <div className="p-4">
                    <h2 className="text-2xl font-bold">Dashboard</h2>
                </div>
                <ul className="p-2 flex-1">
                    <li className="mb-2">
                        <a href="#" className="block p-2 hover:bg-gray-700">Dashboard</a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="block p-2 hover:bg-gray-700">Reports</a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="block p-2 hover:bg-gray-700">Analytics</a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="block p-2 hover:bg-gray-700">Settings</a>
                    </li>
                </ul>
            </div>

            {/* konten utama cok */}
            <div className="flex-1 bg-gray-200 p-4">
                <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">Barang Keluar</h3>
                        <p className="text-gray-700">1000</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">Barang Masuk</h3>
                        <p className="text-gray-700">1000</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
