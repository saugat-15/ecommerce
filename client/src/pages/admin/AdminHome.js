import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
// import AddIcon from "@mui/icons-material/Add";
import "./styles/admin.css";
import { Add } from "@mui/icons-material";
import { Input } from "antd";
// import Modal from "@mui/material/Modal";
import AddProducts from "./AddProducts";
import { Button, Modal } from "antd";
import { setProductDetails } from "../../reducersSlice/productSlice";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import Search from "../../components/Search";
import Footer from "../../components/Footer";

function AdminHome() {
  const searchedProduct = useSelector((state) => state.product.searchedProduct);
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const handleClose = () => {
  //   onClose(selectedValue);
  // };

  // console.log(products)
  // const image = require('../images/inventory.png')
  return (
    <div>
      <Nav />
      <div className="header">
        <div>
          <img
            src="https://www.kindpng.com/picc/m/121-1218470_ecommerce-png-transparent-images-e-commerce-crm-integrated.png"
            height={150}
            width={280}
          />
        </div>
        <p>
          Online Shopping. 50% Off Everything. Online Shopping. 50% Off
          Everything
        </p>
        <div>
          <button onClick={() => navigate("/products")}>
            <Add />
          </button>
        </div>
      </div>
      <Search products={searchedProduct} />
      <div className="products">
        {searchedProduct.map((product) => (
          <div key={product._id} className="product">
            <Link
              to={`./products/${product._id}`}
              style={{ textDecoration: "none", color: "#333" }}
              onClick={() => {
                dispatch(setProductDetails(product));
              }}
            >
              {
                product?.productImage && 
              <img src={require(`../../uploads/${product.productImage}`)} />
              }
              <h4> {product.productName}</h4>
              {/* <span>Type:{product.productType}</span> */}
              <span>${product.price}</span>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default AdminHome;
