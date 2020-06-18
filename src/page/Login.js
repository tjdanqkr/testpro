import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../css/Login.css";
import { FiUserPlus, FiMap, FiUserMinus } from "react-icons/fi";

const Login = Loginstate => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [onLogin, setOnLogin] = useState("login");

  const OnSubmit = e => {
    const post = {
      id: id,
      pw: pw,
    };
    fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then(response => response.text())
      .then(message => {
        console.log(message);
        if (message === "re") {
          alert("다시 시도");
        } else {
          window.sessionStorage.setItem("id", id);
          window.location.replace("/");
        }
      });
  };

  return (
    <div className="Back">
      <div className="onLogin">
        <div className="form">
          <input
            type="text"
            name="id"
            onChange={e => setId(e.target.value)}
            placeholder="id"
          />

          <input
            type="password"
            name="pw"
            onChange={e => setPw(e.target.value)}
            placeholder="password"
          />

          <button onClick={OnSubmit}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
