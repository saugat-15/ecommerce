import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import {
  increaseCartCount,
  decreaseCartCount,
  resetCartItems,
} from "../reducersSlice/cartSlice";
import "./styles/cart.css";
import Nav from "../components/Nav";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useSelector, useDispatch } from "react-redux";

function Cart() {
  const product = useSelector((state) => state.product.product);
  // const cart = useSelector(state => state.cart)
  const [productCount, setProductCount] = useState(product.productCount);
  const dispatch = useDispatch();

  const increaseCount = () => {
    setProductCount(productCount + 1);
  };
  const decreaseCount = () => {
    setProductCount(productCount - 1);
  };
  const { cart } = useSelector((state) => state.cart);
  const newCart = [...cart];
  console.log(newCart);

  const resetCart = () => {
    dispatch(resetCartItems());
  };

  newCart.map((item) => {
    // if (item.productId === id) {
    //   // item.productCount = item.productCount + 1;
    // }
  });

  // console.log(itemss);

  //   console.log(product);

  //   console.log(cart);
  return (
    <>
      <Nav />
      {cart.length !== 0 && (
        <div className="cart" style={{ flexDirection: "column" }}>
          <div className="cart-reset">
            <button onClick={() => resetCart()}>reset cart</button>
          </div>
          {cart.map((product) => (
            <div key={product.productId} className="cart-items">
              {/* <Link
              to={`./products/${product._id}`}
              style={{ textDecoration: "none", color: "#333" }}
              onClick={() => {
                  dispatch(setProductDetails(product));
                }}
            > */}
              <img src={require(`../../uploads/${product.productImage}`)} />
              <div className="cart-divider"></div>
              <div className="cart-item-details">
                <h4> Item: {product.productName}</h4>

                <h4>No of Items: {product.productCount}</h4>

                <h4>${product.productPrice}</h4>
                {/* </Link> */}
              </div>
              <div>
                <ButtonGroup>
                  <Button
                    className="button"
                    // onClick={() => decreaseCount()}
                    disabled={productCount === 0 ? true : false}
                    onClick={() =>
                      dispatch(decreaseCartCount(product.productId))
                    }
                  >
                    -
                  </Button>
                  <Button
                    className="button"
                    onClick={() =>
                      dispatch(increaseCartCount(product.productId))
                    }
                  >
                    +
                  </Button>
                  <p style={{ margin: "1rem" }}>{productCount}</p>
                </ButtonGroup>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length === 0 && <div>Cart Empty</div>}
    </>
  );
}

export default Cart;
