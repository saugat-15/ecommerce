import React from "react";
import "./styles/nav.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetUserCredentials } from "../reducersSlice/userSlice";
import { message } from "antd";

function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector((state) => state.users.name);
  console.log(name);

  const triggerLogout = () => {
    dispatch(resetUserCredentials());
    navigate("/");
    message.success('logged out successfully')
  };

  return (
    <div className="nav">
      <div className="nav-left">
        <h3>Ecommerce MERN</h3>
      </div>
      <div className="nav-right">
        <ul>
          <Link to="/admin" style={{ textDecoration: 'none' }}>
            <li>Home</li>
          </Link>
          <Link style={{ textDecoration: 'none' }}>
            <li>Contact Us</li>
          </Link>

          <button onClick={triggerLogout}>Sign Out</button>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
