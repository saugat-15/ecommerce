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
import { useEffect, useState } from "react";
import { message } from "antd";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  const { token, role } = useSelector((state) => state.users);
  const [authorizeRole, setAuthorizeRole] = useState(null);

  const navigateControl = () => {
    if (token && role === "admin") {
      setAuthorizeRole("admin");
    } else if (token && role === "user") {
      setAuthorizeRole("user");
    } else {
      setAuthorizeRole(null);
    }
  };

  useEffect(() => {
    navigateControl();
  }, [role, token]);
  // const token = 5
  // console.log(token)
  return (
    <div className="App">
      {!authorizeRole ? (
        // <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
        </Routes>
      ) : (
        // </BrowserRouter>
        <AuthorisedUsers authorizeRole={authorizeRole} />
      )}
    </div>
  );
}

const AuthorisedUsers = (props) => {
  if (props.authorizeRole === "user") {
    return <UserRoute />;
  } else {
    return <AdminRoute />;
  }
};

const UserRoute = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/products" element={<AddProducts />} />
      <Route path="/admin/products/:id" element={<Product />} />
    </Routes>
  );
};

export default App;
