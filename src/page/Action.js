import React, { useState, useEffect } from "react";
import "../css/Action.css";
import { BsBarChartFill, BsClipboard, BsGraphUp } from "react-icons/bs";
import { FiInstagram } from "react-icons/fi";
import { FaRegThumbsUp } from "react-icons/fa";
import Graph from "./Graph";

const Action = (dong, fa) => {
  const [dong1, setDong1] = useState(dong.dong);
  const [graphstate, setGraphstate] = useState(false);

  const graph = () => {
    if (graphstate) {
      setGraphstate(false);
    } else {
      setGraphstate(true);
    }
  };
  return (
    <div className="Action">
      <div className="sel">
        {dong.dong === "" ? <p>동을 선택해주세요</p> : <p>{dong.dong}</p>}

        <div className="icons">
          <BsBarChartFill onClick={graph}></BsBarChartFill>
          <BsClipboard></BsClipboard>
          <FiInstagram></FiInstagram>
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
