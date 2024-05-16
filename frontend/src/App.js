import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './components/Login';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Dashboard from './components/Dashboard';
import AddInput from './components/BarangMasuk';

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/products" element={<ProductList/>}/>
      <Route path="/add" element={<AddProduct/>}/>
      <Route path="/edit/:id" element={<EditProduct/>}/>
      <Route path="/inputs" element={<AddInput/>}/>
    </Routes>
   </BrowserRouter>
  );
};

export default App;
