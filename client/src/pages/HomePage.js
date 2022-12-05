import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUserCredentials } from "../reducersSlice/userSlice";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector((state) => state.users.name);
  

  return (
    <div>
      <Nav />
      hi, {name}
    </div>
  );
}

export default HomePage;
