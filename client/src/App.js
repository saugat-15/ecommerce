// import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import HomePage from "./pages/HomePage";
import AdminHome from "./pages/admin/AdminHome";

import { useSelector } from "react-redux";
import AddProducts from "./pages/admin/AddProducts";
import Product from "./pages/admin/Product";

function App() {
  const token = useSelector((state) => state.users.token);
  // const token = 5
  // console.log(token)
  return (
    <div className="App">
      {/* <Login /> */}

      <BrowserRouter>
        <Routes>
          {token && <Route path="/home" element={<HomePage />} />}
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/products" element={<AddProducts />} />
          <Route path="/products/product" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
