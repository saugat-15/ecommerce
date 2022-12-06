import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
// import AddIcon from "@mui/icons-material/Add";
import "./styles/admin.css";
import { Add } from "@mui/icons-material";
import { Input } from 'antd';
// import Modal from "@mui/material/Modal";
import AddProducts from "./AddProducts";
import { Button, Modal } from "antd";
import { setProductDetails } from "../../reducersSlice/productSlice";
import { useDispatch } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';

function AdminHome() {
  const [products, setProducts] = useState([]);
  // const [selectedItem, setSelectedItem] = useState({});
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const filterProducts = () => {
    const searchProd = products.filter((product) => {
      return product.productName.toLowerCase() === input.toLowerCase()
    });
    setProducts(searchProd)
      
  }

  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:5000/products");
    const data = await response.json();
    setProducts(data.productsList);
  };

  useEffect(() => {
    fetchProducts();
  }, [input]);

  console.log(products);
  console.log(input);
  const navigate = useNavigate();
  // const handleClose = () => {
  //   onClose(selectedValue);
  // };

  // const image = require('../images/inventory.png')
  return (
    <div>
      <Nav />
      <div className="header">
        <div>
          <img src='https://www.kindpng.com/picc/m/121-1218470_ecommerce-png-transparent-images-e-commerce-crm-integrated.png' height={150} width={280} />
        </div>
        <p>Online Shopping. 50% Off Everything. Online Shopping. 50% Off Everything</p>
        <div>
          <button onClick={() => navigate("/products")}>
            <Add />
          </button>
        </div>
      </div>
      <div className="search">
        <Input placeholder="Search" onChange={(e) => setInput(e.target.value) }/>
        <SearchIcon style={{color: '#888', cursor: 'pointer'}} onClick={()=>filterProducts()}/>

      </div>
      <div className="products">
        {products.map((product) => (
          <div key={product._id} className="product">
            <Link
              to="/products/product"
              style={{ textDecoration: "none", color: "#333" }}
              onClick={() => {
                dispatch(setProductDetails(product));
              }}
            >
              <img src={require(`../../../uploads/${product.productImage}`)} />
              <h4> {product.productName}</h4>
              {/* <span>Type:{product.productType}</span> */}
              <span>${product.price}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminHome;
