import React from 'react'
import { useState, useEffect } from "react";
import { Input } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import { setSearchedProduct } from '../reducersSlice/productSlice';
import { useDispatch } from 'react-redux';



function Search(props) {
    const [input, setInput] = useState("");
    const [products, setProducts] = useState(props.products);

    const dispatch = useDispatch();

    const filterProducts = () => {
        if (input) {
            const searchProd = products.filter((product) => {
                return product.productName.toLowerCase() === input.toLowerCase();
            });
            dispatch(setSearchedProduct(searchProd));
        }
    };
    
    
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:4000/products");
      const data = await response.json();
        setProducts(data.productsList)
        dispatch(setSearchedProduct(data.productsList))
      };
    
      useEffect(() => {
        fetchProducts();
      }, [input]);
    
    //   console.log(products);
    //   console.log(input);
    //   const navigate = useNavigate();
  return (
    <div className="search">
        <Input
          placeholder="Search"
          onChange={(e) => setInput(e.target.value)}
        />
        <SearchIcon
          style={{ color: "#888", cursor: "pointer" }}
          onClick={() => filterProducts()}
        />
      </div>
  )
}

export default Search