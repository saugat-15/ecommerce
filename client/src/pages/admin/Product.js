import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./styles/admin.css";
import { Button, message, Modal } from "antd";
import { Edit, Delete } from "@mui/icons-material";
import AddProducts from "./AddProducts";
import { useNavigate } from "react-router-dom";
// import { message } from "antd";

function Product() {
  const { product } = useSelector((state) => state.product);
  const { users } = useSelector((state) => state);
  const [selectedItem, setSelectedItem] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const triggerDelete = async () => {
    console.log("product deleted");
    const requestOptions = {
      method: "DELETE",
    };

    const response = await fetch(
      `http://localhost:5000/products/${product._id}`,
      requestOptions
    );

    const data = await response.json();

    if (data) {
      navigate("/admin");
      message.success(data.message);
    }
  };

  console.log(users);

  return (
    <div className="products">
      <Modal
        footer={null}
        title="Edit Product details"
        open={open}
        onOk={handleClose}
        onCancel={handleClose}
      >
        <AddProducts selectedItem={selectedItem} flag="edit-product" />
      </Modal>
      <div
        key={product._id}
        className="product"
        style={{ height: "90vh", width: "auto" }}
      >
        <img
          style={{ height: "400px" }}
          src={require(`../../../uploads/${product.productImage}`)}
        />
        <h4> {product.productName}</h4>
        {/* <span>Type:{product.productType}</span> */}
        <span>${product.price}</span>
        <div style={users.role === 'user' ? {display: 'none'} : null}>
        {/* <div> */}
          <button style={{margin: '5px'}}
            onClick={() => {
              handleOpen();
              setSelectedItem(product);
            }}
            // disabled={`${users.role === "user" ? true : false}`}
          >
            <Edit />
          </button>
          <button style={{margin: '5px'}}
            onClick={() => triggerDelete()}
            // disabled={`${users.role === "user" ? true : false}`}
          >
            <Delete />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
