import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [data, setData] = useState({
    products: [],
    suppliers: [],
    customers: [],
    barangMasuk: [],
    barangKeluar: [],
  });

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, suppliers, customers, barangMasuk, barangKeluar] =
          await Promise.all([
            axios.get("http://localhost:5000/products"),
            axios.get("http://localhost:5000/suppliers"),
            axios.get("http://localhost:5000/customers"),
            axios.get("http://localhost:5000/inputs"),
            axios.get("http://localhost:5000/keluar"),
          ]);

        setData({
          products: products.data,
          suppliers: suppliers.data,
          customers: customers.data,
          barangMasuk: barangMasuk.data,
          barangKeluar: barangKeluar.data,
        });

        checkForAlerts(products.data, barangMasuk.data, barangKeluar.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const checkForAlerts = (products, barangMasuk, barangKeluar) => {
    const alerts = [];

    products.forEach((product) => {
      if (product.stok < 10) {
        alerts.push({
          type: "low-stock",
          message: `Stok produk ${product.nama} rendah: hanya ${product.stok} unit tersisa.`,
        });
      }
    });

    setAlerts(alerts);
  };

  // Aggregate data for charts and statistics
  const totalProducts = data.products.length;
  const totalSuppliers = data.suppliers.length;
  const totalCustomers = data.customers.length;
  const totalBarangMasuk = data.barangMasuk.reduce(
    (total, item) => total + item.jumlah,
    0
  );
  const totalBarangKeluar = data.barangKeluar.reduce(
    (total, item) => total + item.jumlah,
    0
  );

  // Chart Data
  const barangMasukChartData = {
    labels: data.barangMasuk.map((item) =>
      new Date(item.tanggal).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Barang Masuk",
        data: data.barangMasuk.map((item) => item.jumlah),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barangKeluarChartData = {
    labels: data.barangKeluar.map((item) =>
      new Date(item.tanggal).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Barang Keluar",
        data: data.barangKeluar.map((item) => item.jumlah),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: data.products.map((product) => product.nama),
    datasets: [
      {
        label: "Products",
        data: data.products.map((product) => product.stok),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {alerts.length > 0 && (
        <div className="mb-6">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`p-4 mb-4 ${
                alert.type === "low-stock" ? "bg-red-200" : "bg-yellow-200"
              } rounded-lg`}
            >
              <p className="text-md">{alert.message}</p>
            </div>
          ))}
        </div>
      )}

      <div className="text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6  ">
          <div className="p-4 bg-white shadow rounded-lg ">
            <h2 className="text-xl font-bold">Total Products</h2>
            <p className="text-3xl mt-2 font-bold">{totalProducts}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg ">
            <h2 className="text-xl font-bold">Total Suppliers</h2>
            <p className="text-3xl mt-2 font-bold">{totalSuppliers}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg ">
            <h2 className="text-xl font-bold">Total Customers</h2>
            <p className="text-3xl mt-2 font-bold">{totalCustomers}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg ">
            <h2 className="text-lg font-bold">Total Barang Masuk</h2>
            <p className="text-3xl mt-2 font-bold">{totalBarangMasuk}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg ">
            <h2 className="text-lg font-bold">Total Barang Keluar</h2>
            <p className="text-3xl mt-2 font-bold">{totalBarangKeluar}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-bold mb-4">Barang Masuk Over Time</h2>
          <Line data={barangMasukChartData} />
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-bold mb-4">Barang Keluar Over Time</h2>
          <Line data={barangKeluarChartData} />
        </div>
      </div>

      <div className="grid gap-4 text-center md:flex">
        <div className="p-4 bg-white shadow rounded-lg max-w-md justify-center items-center">
          <h2 className="text-xl font-bold mb-4">Product Stock Distribution</h2>
          <Pie data={pieChartData} />
        </div>
        <div className="p-4 bg-white shadow rounded-lg w-full">
          <h2 className="text-xl font-bold mb-4">
            Riwayat Barang Masuk Terakhir
          </h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">Tanggal</th>
                <th className="py-2 px-4 border-b">Jumlah</th>
                <th className="py-2 px-4 border-b">Barang</th>
                <th className="py-2 px-4 border-b">Supplier</th>
              </tr>
            </thead>
            <tbody>
              {data.barangMasuk.slice(-3).map((item, index) => (
                <tr className="bg-white border-b" key={item.id}>
                  <td className="py-2 px-4 text-center">{index + 1}</td>
                  <td className="py-2 px-6">
                    {new Date(item.tanggal).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-6">{item.jumlah}</td>
                  <td className="py-2 px-6">{item.barang.nama}</td>
                  <td className="py-2 px-6">{item.supplier.nama}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 className="text-xl font-bold mt-4 mb-4">
            Riwayat Barang Keluar Terakhir
          </h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">Tanggal</th>
                <th className="py-2 px-4 border-b">Jumlah</th>
                <th className="py-2 px-4 border-b">Barang</th>
                <th className="py-2 px-4 border-b">Customer</th>
              </tr>
            </thead>
            <tbody>
              {data.barangKeluar.slice(-3).map((item, index) => (
                <tr className="bg-white border-b" key={item.id}>
                  <td className="py-2 px-4 text-center">{index + 1}</td>
                  <td className="py-2 px-6">
                    {new Date(item.tanggal).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-6">{item.jumlah}</td>
                  <td className="py-2 px-6">{item.barang.nama}</td>
                  <td className="py-2 px-6">{item.customer.nama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
