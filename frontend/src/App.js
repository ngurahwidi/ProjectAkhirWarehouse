import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './components/Login';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/products" element={<ProductList/>}/>
      <Route path="/add" element={<AddProduct/>}/>
      <Route path="/edit/:id" element={<EditProduct/>}/>
    </Routes>
   </BrowserRouter>
  );
};

export default App;
