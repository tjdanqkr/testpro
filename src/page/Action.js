import React, { useState, useEffect } from "react";
import "../css/Action.css";
import { BsBarChartFill, BsClipboard, BsGraphUp } from "react-icons/bs";
import { FiInstagram } from "react-icons/fi";
import { FaRegThumbsUp } from "react-icons/fa";
import Graph from "./Graph";

const Action = (dong, fa) => {
  const [dong1, setDong1] = useState(dong.dong);
  const [graphstate, setGraphstate] = useState(false);
  const [instastate, setInstastate] = useState(false);
  const [ma, setMa] = useState("");
  const isdong =() =>{
    if(dong.dong===""){
      alert("동을 선택해 주세요")
      return false;
    }
    return true;
  }
  const graph = () => {
  
    const isf = isdong();
    if (isf) {
      if (graphstate) {
        setGraphstate(false);
      } else {
        setGraphstate(true);
      }
    }
  };
  
  const insta = () => {
    const post = {
      word: "강남역카페",
    };
    fetch("/api/instar", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.text())
      .then((message) => {

        console.log(message);
        const json = JSON.parse(message);
        console.log(json[[0]["cafe"]]);
      });

  };
  return (
    <div className="Action">
      <div className="sel">
        {dong.dong === "" ? <p>동을 선택해주세요</p> : <p>{dong.dong}</p>}

        <div className="icons">
          <BsBarChartFill onClick={graph}></BsBarChartFill>
          <BsClipboard></BsClipboard>
          <FiInstagram onClick={insta}></FiInstagram>
          <FaRegThumbsUp></FaRegThumbsUp>
          <BsGraphUp></BsGraphUp>
          {
            instastate?<p>{ma}</p>:<></>
          }
        </div>
        {/* {fa.fa !== "" && dong.dong !== "" ? (
          <p></p>
        ) : (
          <div className="sr">
            <p>
              {dong.dong}에 {fa.fa}
            </p>
          </div>
        )} */}
      </div>
      {graphstate ? (
        <div className="option">
          <Graph dong={dong.dong} fa={fa.fa}></Graph>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};
export default Action;
