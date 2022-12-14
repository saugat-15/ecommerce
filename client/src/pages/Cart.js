import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import {
  increaseCartCount,
  decreaseCartCount,
  resetCartItems,
} from "../reducersSlice/cartSlice";
import "./styles/cart.css";
import Nav from "../components/Nav";
import InfiniteScroll from "react-infinite-scroll-component";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useSelector, useDispatch } from "react-redux";

function Cart() {
  const product = useSelector((state) => state.product.product);
  // const cart = useSelector(state => state.cart)
  const [productCount, setProductCount] = useState(product.productCount);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  // const newCart = [...cart];
  console.log(cart);

  const resetCart = () => {
    dispatch(resetCartItems());
  };

  let items = cart.map((item) => item.productPrice * item.productCount);

  let itemCount = cart.map((item) => item.productCount);

  let totalItems = itemCount.reduce((acc, currVal) => {
    return acc + currVal;
  }, 0);

  console.log(itemCount);

  const totalPrice = items.reduce((acc, total) => {
    return acc + total;
  }, 0);

  console.log(totalPrice);

  const vat = 56;
  // newCart.map((item) => {
  //   // if (item.productId === id) {
  //   //   // item.productCount = item.productCount + 1;
  //   // }
  // });

  // console.log(itemss);

  //   console.log(product);

  //   console.log(cart);
  return (
    <>
      <Nav />
      <div className="cart-reset">
        <button onClick={() => resetCart()}>reset cart</button>
      </div>
      {cart.length !== 0 && (
        <div className="cart">
          <div>
            <InfiniteScroll
              dataLength={items.length} //This is important field to render the next data
              next={product}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              // endMessage={
              //   <p style={{ textAlign: "center" }}>
              //     <b>Yay! You have seen it all</b>
              //   </p>
              // }
              // below props only if you need pull down functionality
            >
              {cart.map((product) => (
                <div key={product.productId} className="cart-items">
                  <img src={require(`../../uploads/${product.productImage}`)} />

                  <div className="cart-item-details">
                    <span> Item: {product.productName}</span>

                    <span>No of Items: {product.productCount}</span>

                    <span>${product.productPrice}</span>
                    {/* </Link> */}

                    <ButtonGroup style={{ marginTop: "10px" }}>
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
            </InfiniteScroll>
          </div>
          <div className="cart-summary">
            <h4>Cart Summary:</h4>
            <div className="cart-summary-items">
              <div className="cart-summary-items-left">
                <span>Products</span>
                <span>Shipping Costs</span>
                <span>Payment Costs</span>
              </div>
              <div className="cart-summary-items-right">
                <span>{totalItems}</span>
                <span>Free</span>
                <span>Free</span>
              </div>
            </div>
            <div className="cart-total">
              <div className="cart-total-left">
                <span>Subtotal</span>
                <span>VAT (21%)</span>
                <span>Total</span>
              </div>
              <div className="cart-total-right">
                <span>${totalPrice}</span>
                <span>${vat}</span>
                <span>${totalPrice + vat}</span>
              </div>
            </div>
            <div>
              <button style={{ background: "#0c75a6" }}>
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      )}
      {cart.length === 0 && <div>Cart Empty</div>}
    </>
  );
}

export default Cart;
