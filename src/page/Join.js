import React, { useState, useEffect } from "react";

import "../css/Login.css";

function Join() {
  const [idcheck, setIdcheck] = useState(false);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [repw, setRepw] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [checkmessage, setCheckMessage] = useState("");
  const [joinmessage, setJoinmessage] = useState("");

  const idch = () => {
    //setIdcheck(true);
    const post = {
      id: id,
    };
    fetch("/api/checkId", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then(response => response.text())
      .then(message => {
        console.log(message);
        setCheckMessage(message);
        setIdcheck(true);
      });
  };
  const anSubmit = e => {
    if (pw === repw) {
      const post = {
        id: id,
        pw: pw,
        name: name,
        age: age,
      };
      fetch("/api/insert", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(post),
      })
        .then(response => response.text())
        .then(message => {
          console.log(message);
        });
      alert("가입완료");
      window.location.replace("/");
    } else {
      alert("비밀번호가 맞지 않습니다.");
    }
  };

  return (
    <div className="Back">
      <div className="Join">
        <div className="form">
          <input
            type="text"
            name="Id"
            onChange={e => setId(e.target.value)}
            placeholder="id"
          />
          <input type="button" onClick={idch} value="아이디 중복 검사" />
          {idcheck === true ? <p>{checkmessage}</p> : <p></p>}
          <input
            type="password"
            name="Pw"
            onChange={e => setPw(e.target.value)}
            placeholder="password"
          />
          <input
            type="password"
            name="rePw"
            onChange={e => setRepw(e.target.value)}
            placeholder="REpassword"
          />
          <input
            type="text"
            name="name"
            onChange={e => setName(e.target.value)}
            placeholder="name"
          />
          <input
            type="text"
            name="age"
            onChange={e => setAge(e.target.value)}
            placeholder="age"
          />

          <input type="button" value="Join" onClick={anSubmit} />
        </div>
      </div>
    </div>
  );
}

export default Join;
