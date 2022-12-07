import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetCartItems } from "../reducersSlice/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const resetCart = () => {
    dispatch(resetCartItems());
  };

  console.log(cart);
  return (
    <div className="products" style={{flexDirection: 'column'}}>
        <button onClick={()=>resetCart()}>reset cart</button>
      {cart.map((product) => (
          <div key={product.productId} className="product" style={{width: "100%", alignItems:"left", flexDirection: "column"}}>
            {/* <Link
              to={`./products/${product._id}`}
              style={{ textDecoration: "none", color: "#333" }}
              onClick={() => {
                dispatch(setProductDetails(product));
              }}
            > */}
              <img  style={{width: "20%", height: '200px'}}src={require(`../../uploads/${product.productImage}`)} />
              <h4> {product.productName}</h4>
              <span>No of Items: <h4>{product.productCount}</h4></span>
              <span>${product.productPrice}</span>
            {/* </Link> */}
          </div>
        ))}
    </div>
  );
}

export default Cart;
