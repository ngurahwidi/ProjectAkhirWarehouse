import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import BarangMasuk from "./pages/BarangMasuk";
import AddBarangMasuk from "./pages/AddBarangMasuk";
import EditBarangMasuk from "./pages/EditBarangMasuk";
import BarangKeluar from "./pages/BarangKeluar";
import AddBarangKeluar from "./pages/AddBarangKeluar";
import EditBarangKeluar from "./pages/EditBarangKeluar";
import Customers from "./pages/Customers";
import AddCustomer from "./pages/AddCustomer";
import EditCustomer from "./pages/EditCustomer";
import Suppliers from "./pages/Suppliers";
import AddSupplier from "./pages/AddSupplier";
import EditSupplier from "./pages/EditSupplier";
import ScanQRCode from "./components/ScanQRCode";
import withAuth from "./components/Auth";
import ScanQRCodeKeluar from "./components/scanQRKeluar";

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
const ProtectedCustomers = withAuth(Customers);
const ProtectedAddCustomer = withAuth(AddCustomer);
const ProtectedEditCustomer = withAuth(EditCustomer);
const ProtectedSuppliers = withAuth(Suppliers);
const ProtectedAddSupplier = withAuth(AddSupplier);
const ProtectedEditSupplier = withAuth(EditSupplier);
const ProtectedScanQRCode = withAuth(ScanQRCode);
const ProtectedScanQRCodeKeluar = withAuth(ScanQRCodeKeluar);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
        <Route path="/customers" element={<ProtectedCustomers />} />
        <Route path="/customers/add" element={<ProtectedAddCustomer />} />
        <Route path="/customers/:id" element={<ProtectedEditCustomer />} />
        <Route path="/suppliers" element={<ProtectedSuppliers />} />
        <Route path="/suppliers/add" element={<ProtectedAddSupplier />} />
        <Route path="/suppliers/:id" element={<ProtectedEditSupplier />} />
        <Route path="/scan" element={<ProtectedScanQRCode />} />
        <Route path="/scanKeluar" element={<ProtectedScanQRCodeKeluar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
