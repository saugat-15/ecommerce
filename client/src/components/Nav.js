import React from "react";
import "./styles/nav.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetUserCredentials } from "../reducersSlice/userSlice";
import { message } from "antd";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, role } = useSelector((state) => state.users);
  // console.log(name);

  const triggerLogout = () => {
    dispatch(resetUserCredentials());
    navigate("/");
    message.success("logged out successfully");
  };

  return (
    <div className="nav">
      <div className="nav-left">
        <img
          src="https://www.pngmart.com/files/11/Online-Portal-E-Commerce-PNG-Pic.png"
          height={60}
          width={90}
          style={{ margin: "0 1rem" }}
        />
        <h3>Ecommerce MERN</h3>
      </div>
      <div className="nav-right">
        <ul>
          <Link
            to={`${role === "admin" ? "/admin" : "/home"}`}
            style={{ textDecoration: "none" }}
          >
            <li>Home</li>
          </Link>
          <Link style={{ textDecoration: "none" }}>
            <li>Contact Us</li>
          </Link>
          <li>
            {role === 'user' && <ShoppingCartIcon onClick={() => navigate("/cart")} />}
          </li>

          <button onClick={triggerLogout}>Sign Out</button>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
