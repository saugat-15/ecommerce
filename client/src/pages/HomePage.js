import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUserCredentials } from "../reducersSlice/userSlice";
import { setProductDetails } from "../reducersSlice/productSlice";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Nav from "../components/Nav";

function HomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:5000/products");
    const data = await response.json();
    setProducts(data.productsList);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);
  console.log(users);
  

  return (
    <div>
      <Nav />
      <Header />
      {/* hi,  */}
      <div className="products">
        {products.map((product) => (
          <div key={product._id} className="product">
            <Link
              to={`/products/${product._id}`}
              style={{ textDecoration: "none", color: "#333" }}
              onClick={() => {
                dispatch(setProductDetails(product));
              }}
            >
              <img src={require(`../../uploads/${product.productImage}`)} />
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

export default HomePage;
