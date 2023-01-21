import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles/admin.css";
import { message, Modal } from "antd";
import { Edit, Delete } from "@mui/icons-material";
import AddProducts from "./AddProducts";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { setCartItems } from "../../reducersSlice/cartSlice";

function Product() {
  const product = useSelector((state) => state.product.product);

  const { users } = useSelector((state) => state);
  const [selectedItem, setSelectedItem] = useState({});
  const [productCount, setProductCount] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(product);
  // console.log(users.role)

  const increaseCount = () => {
    setProductCount(productCount + 1);
  };
  const decreaseCount = () => {
    setProductCount(productCount - 1);
  };

  const fetchData = () => {
    setOpen(false);
  };

  // const productName = product.productName;

  const addToCart = () => {
    dispatch(
      setCartItems({
        productName: product.productName,
        productId: product._id,
        productImage: product.productImage,
        productCount: productCount,
        productPrice: product.price,

      })
    );
    message.success('Added to Cart')
    navigate('/home')
  };

  const triggerDelete = async () => {
    console.log("product deleted");
    const requestOptions = {
      method: "DELETE",
    };

    const response = await fetch(
      `http://localhost:4000/products/${product._id}`,
      requestOptions
    );

    const data = await response.json();

    if (data) {
      navigate("/admin");
      message.success(data.message);
    }
  };

  console.log(selectedItem);

  return (
    <div className="products">
      <div
        key={product._id}
        className="product"
        // style={{ height: "90vh", width: "auto" }}
      >
        <Modal
          footer={null}
          title="Edit Product details"
          open={open}
          onOk={handleClose}
          onCancel={handleClose}
        >
          <AddProducts
            fetchData={fetchData}
            selectedItem={selectedItem}
            flag="edit-product"
          />
        </Modal>
        <div>
          <img
            style={{ height: "400px" }}
            src={require(`../../uploads/${product.productImage}`)}
          />
          <h4> {product.productName}</h4>
          {/* <span>Type:{product.productType}</span> */}
          <span>${product.price}</span>
          <div style={users.role === "user" ? { display: "none" } : null}>
            {/* <div> */}
            <button
              style={{ margin: "5px" }}
              onClick={() => {
                handleOpen();
                setSelectedItem(product);
              }}
              // disabled={`${users.role === "user" ? true : false}`}
            >
              <Edit />
            </button>
            <button
              style={{ margin: "5px" }}
              onClick={() => triggerDelete()}
              // disabled={`${users.role === "user" ? true : false}`}
            >
              <Delete />
            </button>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      {/* <div className="product-description">
        <h4>Product Description:</h4>
        <span>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </span>
      </div> */}
      <div className="product-description">
        <h4>Product Description:</h4>
        <span>{product.description}</span>

        {users.role==='user' && <div className="product-count">
          <span>Amount:</span>
          <ButtonGroup>
            <Button
              className="button"
              onClick={() => decreaseCount()}
              disabled={productCount === 0 ? true : false}
            >
              -
            </Button>
            <Button className="button" onClick={() => increaseCount()}>
              +
            </Button>
            <p style={{ margin: "1rem" }}>{productCount}</p>
          </ButtonGroup>
        <button onClick={() => addToCart()}>Add to Cart</button>
        </div>}
      </div>
    </div>
  );
}

export default Product;
