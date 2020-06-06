import React, { useState, useEffect } from "react";
import { FcHome } from "react-icons/fc";
import { AiOutlineLogin } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import "../css/Header.css";
import Login from "./Login";

function Header() {
  const [loginstate, setLoginstate] = useState(false);
  const [header, setHeader] =useState("Header");
  const onclick = () => {
    if (loginstate) {
      setLoginstate(false);
      setHeader("Header");
    } else {
      setLoginstate(true);
      setHeader("onHeader");
    }
  };
  const logout = () => {
    window.sessionStorage.setItem("id", null);
    window.location.replace("/");
  };
  return (
    <div className={header}>
      <div className="homebutton">
        <Link to="/Map">
          <FcHome></FcHome>
        </Link>
        
      </div>
      <div className="actionbutton">
          {window.sessionStorage.getItem("id") === null ? (
            <AiOutlineLogin onClick={onclick}></AiOutlineLogin>
          ) : (
            <FiLogOut onClick={logout}></FiLogOut>
          )}
        </div>
      {loginstate ? <Login></Login> : <p></p>}
    </div>
  );
}
export default Header;
