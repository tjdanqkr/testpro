import React, { useState } from "react";
import { FcHome } from "react-icons/fc";
import { AiOutlineLogin } from "react-icons/ai";
import { Link } from "react-router-dom";
import { combineReducers } from "redux";

import "../css/Header.css";
function Header() {
  const [loginstate, setLoginstate] = useState("Login");
  const onclick = () => {
    setLoginstate("onLogin");
  };
  return (
    <div className="Header">
      <div className="homebutton">
        <Link to="/Map">
          <FcHome></FcHome>
        </Link>
      </div>
      <div className="loginbutton">
        <AiOutlineLogin></AiOutlineLogin>
      </div>
    </div>
  );
}
export default Header;
