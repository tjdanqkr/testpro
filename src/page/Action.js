import React, { useState, useEffect } from "react";
import "../css/Action.css";
import { BsBarChartFill, BsClipboard, BsGraphUp } from "react-icons/bs";
import { FiInstagram } from "react-icons/fi";
import { FaRegThumbsUp } from "react-icons/fa";
import Graph from "./Graph";
import Insta from "./Insta";
import Biyong from "./Biyong";
import Biyongop from "./Biyongop";
import Axios from "axios";

const Action = (dong, fa) => {
  const [dong1, setDong1] = useState(dong.dong);
  const [graphstate, setGraphstate] = useState(false);
  const [instastate, setInstastate] = useState(false);
  const [ma, setMa] = useState("");
  const [biyong, setBiyong] = useState(false);
  const [json, setJson] = useState();
  let isq = false;

  const isdong = () => {
    if (dong.dong === "") {
      alert("동을 선택해 주세요");
      return false;
    }
    return true;
  };
  const graph = () => {
    const isf = isdong();
    if (isf) {
      if (instastate) {
        setInstastate(false);
      }
      if (biyong) {
        setBiyong(false);
      }
      if (graphstate) {
        setGraphstate(false);
      } else {
        setGraphstate(true);
      }
    }
  };

  const instast = () => {
    if (graphstate) {
      setGraphstate(false);
    }
    if (biyong) {
      setBiyong(false);
    }
    if (instastate) {
      setInstastate(false);
    } else {
      setInstastate(true);
    }
  };

  const biyongsta = async () => {
    if (window.sessionStorage.getItem("id") !== "") {
      const isf = isdong();
      if (isf) {
        if (graphstate) {
          setGraphstate(false);
        }
        if (instastate) {
          setInstastate(false);
        }
        if (biyong) {
          setBiyong(false);
        } else {
          await setBiyong(true);
        }
      }
    }
  };

  return (
    <div className="Action">
      <div className="sel">
        {dong.dong === "" ? <p>동을 선택해주세요</p> : <p>{dong.dong}</p>}

        <div className="icons">
          <BsBarChartFill onClick={graph}></BsBarChartFill>
          <BsClipboard onClick={biyongsta}></BsClipboard>
          <FiInstagram onClick={instast}></FiInstagram>
          <FaRegThumbsUp></FaRegThumbsUp>
          <BsGraphUp></BsGraphUp>
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
      {instastate ? (
        <div className="option">
          <Insta></Insta>
        </div>
      ) : (
        <></>
      )}
      {graphstate ? (
        <div className="option">
          <Graph dong={dong.dong} fa={fa.fa}></Graph>
        </div>
      ) : (
        <p></p>
      )}
      {biyong ? (
        <div className="option">
          <Biyongop dong={dong.dong} json={json}></Biyongop>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};
export default Action;
