import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Dashboard from "./pages/Dashboard";
import AddBarangMasuk from "./pages/AddBarangMasuk";
import AddBarangKeluar from "./pages/AddBarangKeluar";
import EditBarangMasuk from "./pages/EditBarangMasuk";
import EditBarangKeluar from "./pages/EditBarangKeluar";
import BarangMasuk from "./pages/BarangMasuk";
import BarangKeluar from "./pages/BarangKeluar";
import withAuth from "./components/autentikasi"; // Import HOC untuk proteksi rute

const ProtectedDashboard = withAuth(Dashboard);
const ProtectedProducts = withAuth(Products);
const ProtectedAddProduct = withAuth(AddProduct);
const ProtectedEditProduct = withAuth(EditProduct);
const ProtectedBarangMasuk = withAuth(BarangMasuk);
const ProtectedAddBarangMasuk = withAuth(AddBarangMasuk);
const ProtectedEditBarangMasuk = withAuth(EditBarangMasuk);
const ProtectedBarangKeluar = withAuth(BarangKeluar);
const ProtectedAddBarangKeluar = withAuth(AddBarangKeluar);
const ProtectedEditBarangKeluar = withAuth(EditBarangKeluar);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedDashboard />} />
        <Route path="/products" element={<ProtectedProducts />} />
        <Route path="/add" element={<ProtectedAddProduct />} />
        <Route path="/edit/:id" element={<ProtectedEditProduct />} />
        <Route path="/barangMasuk" element={<ProtectedBarangMasuk />} />
        <Route path="/barangMasuk/add" element={<ProtectedAddBarangMasuk />} />
        <Route path="/barangMasuk/:id" element={<ProtectedEditBarangMasuk />} />
        <Route path="/barangKeluar" element={<ProtectedBarangKeluar />} />
        <Route path="/barangKeluar/add" element={<ProtectedAddBarangKeluar />} />
        <Route path="/barangKeluar/:id" element={<ProtectedEditBarangKeluar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
