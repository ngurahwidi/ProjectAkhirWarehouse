import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './components/Login';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Dashboard from './pages/Dashboard';
import BarangMasuk from './pages/BarangMasuk';
import BarangKeluar from './pages/BarangKeluar';

import EditBarangMasuk from './components/FormEditBarangMasuk';
import EditBarangKeluar from './components/FormEditBarangKeluar';

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/add" element={<AddProduct/>}/>
      <Route path="/edit/:id" element={<EditProduct/>}/>
      <Route path="/barangMasuk" element={<BarangMasuk/>}/>
      <Route path="/barangKeluar" element={<BarangKeluar/>}/>

      <Route path="/barangMasuk/:id" element={<EditBarangMasuk/>}/>
      <Route path="/barangKeluar/:id" element={<EditBarangKeluar/>}/>

    </Routes>
   </BrowserRouter>
  );
};

export default App;
