import React, { useState, useEffect } from "react";
import { FcHome } from "react-icons/fc";
import { AiOutlineLogin, AiOutlineAudit } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { FcCancel } from "react-icons/fc";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "../css/Header.css";
import Login from "./Login";
import Join from "./Join";
import Biyong from "./Biyong";

function Header() {
  const [loginstate, setLoginstate] = useState(false);
  const [joinstate, setJoinstate] = useState(false);
  const [header, setHeader] = useState("Header");
  const [biyongst, setBiyongst] = useState(false);
  const onclick = () => {
    if (joinstate) {
      setJoinstate(false);
    }
    if (biyongst) {
      setLoginstate(false);
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
    if (loginstate) {
      setLoginstate(false);
    }
    if (biyongst) {
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
  const onclick3 = () => {
    if (loginstate) {
      setLoginstate(false);
    }
    if (joinstate) {
      setJoinstate(false);
    }
    if (biyongst) {
      setBiyongst(false);
      setHeader("Header");
    } else {
      setBiyongst(true);
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
          <>
            <FiLogOut onClick={logout}></FiLogOut>
            <AiOutlineAudit onClick={onclick3}></AiOutlineAudit>
          </>
        )}
      </div>
      {loginstate ? <Login></Login> : <p></p>}
      {joinstate ? <Join></Join> : <p></p>}
      {biyongst ? (
        <>
          <FcCancel onClick={onclick3}></FcCancel>
          <Biyong></Biyong>
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
}
export default Header;
