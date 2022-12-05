import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
// import AddIcon from "@mui/icons-material/Add";
import "./styles/admin.css";
import { Add } from "@mui/icons-material";
// import Modal from "@mui/material/Modal";
import AddProducts from "./AddProducts";
import { Button, Modal } from "antd";
import { setProductDetails } from "../../reducersSlice/productSlice";
import { useDispatch } from "react-redux";

function AdminHome() {
  const [products, setProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:5000/products");
    const data = await response.json();
    setProducts(data.productsList);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);
  const navigate = useNavigate();
  // const handleClose = () => {
  //   onClose(selectedValue);
  // };
  return (
    <div>
      <Nav />
      <Modal
        footer={null}
        title="Basic Modal"
        open={open}
        onOk={handleClose}
        onCancel={handleClose}
      >
        <AddProducts selectedItem={selectedItem} flag="edit-product" />
      </Modal>
      <div className="header">
        <div>
          <img src='https://www.pngmart.com/files/11/Online-Portal-E-Commerce-PNG-Pic.png' height={100} width={200} />
        </div>
        <p>Online Shopping. 50% Off Everything</p>
        <div>
          <button onClick={() => navigate("/products")}>
            <Add />
          </button>
        </div>
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
