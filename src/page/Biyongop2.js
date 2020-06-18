import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
// const cssa = styled(`.table div{
//     float:left;
// }`);

const Biyongop2 = json => {
  console.log(json.json1);
  const [ma2019, setMa2019] = useState();
  const [ma2020, setMa2020] = useState();
  const [bi, setBi] = useState();
  const [gil, setGil] = useState();
  const [key1, setKey1] = useState();
  function b(key1) {
    const json1 = json;
    setBi(json1[key1].hap);
    setMa2019(json1[key1].m2019);
    setMa2020(json1[key1].m2020);
  }
  const gilst = e => {
    setKey1(e.target.value);
    b(e.target.value);
  };

  return (
    <>
      {json.json1.length !== 0 ? (
        <>
          <div className="list">
            <select onClick={gilst}>
              {json.json1.map((key, index) => {
                return <option value={key}>{index.gil}</option>;
              })}
            </select>
          </div>
          <div className="table">
            <div className="jun">
              <p>전년도 매출액</p>
              <p>{ma2019}</p>
            </div>
            <div className="hu">
              <p>금년도 예상 매출액</p>
              <p>{ma2020}</p>
            </div>
            <div className="chong">
              <p>나의 총 지출액</p>
              <p>{bi}</p>
            </div>
          </div>
        </>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default Biyongop2;
