import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUserCredentials } from "../reducersSlice/userSlice";
import { setProductDetails } from "../reducersSlice/productSlice";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Search from "../components/Search";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function HomePage() {
  const searchedProduct = useSelector(state => state.product.searchedProduct);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  console.log(searchedProduct)

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:5000/products");
    const data = await response.json();
    setProducts(data.productsList);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // console.log(products);
  // console.log(users);
  

  return (
    <div>
      <Nav />
      <ShoppingCartIcon onClick={()=>navigate('/cart')} />
      {/* <Header /> */}
      <Search products={products}/>
      {/* hi,  */}
      <div className="products">
        {searchedProduct.map((product) => (
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
      <Footer />
    </div>
  );
}

export default HomePage;
