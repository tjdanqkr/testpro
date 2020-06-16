import React, { useState, useEffect } from "react";
import Axios from "axios";

const Biyongop = dong => {
  const [ma2019, setMa2019] = useState();
  const [ma2020, setMa2020] = useState();
  const [bi, setBi] = useState();
  const [json, setJson] = useState();
  const a = async () => {
    const post = {
      id: window.sessionStorage.getItem("id"),
      dong: dong.dong1,
    };
    try {
      await Axios.post("/api/biyong1", post).then(res => {
        console.log(res.data);
        setBi(res.data.hap);
        setMa2020(res.data.m2020 / 12);
        setMa2019(res.data.m2019 / 12);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    a();
  });
  return (
    <>
      <div className="macul">
        <div className="table">
          <p>전년도 매출액</p>
          <p>후년도 매출액</p>
          <p>나의 총 지출액</p>
          <p>{ma2019}</p>
          <p>{ma2020}</p>
          <p>{bi}</p>
        </div>
      </div>
    </>
  );
};

export default Biyongop;
