import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './components/Login';
import ProductList from './components/ProductList';

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Products" element={<ProductList/>}/>
    </Routes>
   </BrowserRouter>
  );
};

export default App;
