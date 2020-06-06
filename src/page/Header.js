import React, { useState, useEffect } from "react";
import { FcHome } from "react-icons/fc";
import { AiOutlineLogin } from "react-icons/ai";
import { FiLogOut, } from "react-icons/fi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "../css/Header.css";
import Login from "./Login";
import Join from "./Join";

function Header() {
  const [loginstate, setLoginstate] = useState(false);
  const [joinstate, setJoinstate] = useState(false);
  const [header, setHeader] =useState("Header");
  
  const onclick = () => {
    if(joinstate){
      setJoinstate(false);
    }
    if (loginstate) {
      setLoginstate(false);
      setHeader("Header");
    } else {
      setLoginstate(true);
      setHeader("onHeader");
    }
  };
  const onclick2 = () => {
    if(loginstate){
      setLoginstate(false);
    }
    if (joinstate) {
      setJoinstate(false);
      setHeader("Header");
    } else {
      setJoinstate(true);
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
        <Link to="/">
          <FcHome></FcHome>
        </Link>
        
      </div>
      <div className="actionbutton">
          {window.sessionStorage.getItem("id") === null ? (
            <>
              <AiOutlineLogin onClick={onclick}></AiOutlineLogin>
              <BsFillPersonPlusFill onClick={onclick2}></BsFillPersonPlusFill>
            </>
          ) : (
            <FiLogOut onClick={logout}></FiLogOut>
          )}
        </div>
      {loginstate ? <Login></Login> : <p></p>}
      {joinstate? <Join></Join>:<p></p>}
    </div>
  );
}
export default Header;
