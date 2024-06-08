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
import Customers from "./pages/Customers";
import AddCustomer from "./pages/AddCustomer";
import EditCustomer from "./pages/EditCustomer";
import Suppliers from "./pages/Suppliers";
import AddSupplier from "./pages/AddSupplier";
import EditSupplier from "./pages/EditSupplier";
import ScanQRCode from "./components/ScanQRCode";
import GenerateMasuk from "./pages/GenerateMasuk";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/barangMasuk" element={<BarangMasuk />} />
        <Route path="/barangMasuk/add" element={<AddBarangMasuk />} />
        <Route path="/barangMasuk/:id" element={<EditBarangMasuk />} />
        <Route path="/barangKeluar" element={<BarangKeluar />} />
        <Route path="/barangKeluar/add" element={<AddBarangKeluar />} />
        <Route path="/barangKeluar/:id" element={<EditBarangKeluar />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/add" element={<AddCustomer />} />
        <Route path="/customers/:id" element={<EditCustomer />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/suppliers/add" element={<AddSupplier />} />
        <Route path="/suppliers/:id" element={<EditSupplier />} />
        <Route path="/generateMasuk" element={<GenerateMasuk />} />
        <Route path="/scan" element={<ScanQRCode />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
