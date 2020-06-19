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
import Chuihyung from "./Chuihyung";
import Gilcuchun from "./Gilcuchun";

const Action = (dong, fa) => {
  const [dong1, setDong1] = useState(dong.dong);
  const [graphstate, setGraphstate] = useState(false);
  const [instastate, setInstastate] = useState(false);
  const [chui, setChui] = useState(false);
  const [ma, setMa] = useState("");
  const [biyong, setBiyong] = useState(false);
  const [json, setJson] = useState();
  const [chuidata, setChuidata] = useState();
  const [gilst, setGilst] = useState(false);
  const [gildata, setGildata] = useState();
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
      if (chui) {
        setChui(false);
      }
      if (instastate) {
        setInstastate(false);
      }
      if (biyong) {
        setBiyong(false);
      }
      if (gilst) {
        setGilst(false);
      }
      if (graphstate) {
        setGraphstate(false);
      } else {
        setGraphstate(true);
      }
    }
  };
  const chuist = async () => {
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
      }
      if (gilst) {
        setGilst(false);
      }
      if (chui) {
        setChui(false);
      } else {
        // if (chuidata === undefined) {
        //   const makejson = async () => {
        //     const post = {
        //       dong: dong.dong,
        //     };
        //     await Axios.post("/api/chui", post).then(async function (res) {
        //       await setChuidata(res.data);
        //       await console.log(res.data);
        //     });
        //   };
        //   await makejson();
        // } else {
        await setChui(true);
        // }
      }
    }
  };

  const instast = async () => {
    if (graphstate) {
      setGraphstate(false);
    }
    if (chui) {
      setChui(false);
    }
    if (biyong) {
      setBiyong(false);
    }
    if (gilst) {
      setGilst(false);
    }
    if (instastate) {
      setInstastate(false);
    } else {
      if (json !== undefined) {
        console.log(json);
        setInstastate(true);
      } else {
        await Axios.get("/api/instar2").then(async function (res) {
          await setJson(res.data);
          await console.log(res.data.length);
          await console.log(json);
        });
      }
    }
  };

  const biyongsta = async () => {
    if (window.sessionStorage.getItem("id") !== null) {
      const isf = isdong();
      if (isf) {
        if (chui) {
          setChui(false);
        }
        if (graphstate) {
          setGraphstate(false);
        }
        if (instastate) {
          setInstastate(false);
        }
        if (gilst) {
          setGilst(false);
        }
        if (biyong) {
          setBiyong(false);
        } else {
          await setBiyong(true);
        }
      }
    } else {
      alert("로그인 해주세요");
    }
  };

  const dabongsta = async () => {
    const isf = isdong();
    if (isf) {
      if (chui) {
        setChui(false);
      }
      if (graphstate) {
        setGraphstate(false);
      }
      if (instastate) {
        setInstastate(false);
      }
      if (biyong) {
        setBiyong(false);
      }
      if (gilst) {
        setGilst(false);
      } else {
        // if (gildata === undefined) {
        //   const makelist = async () => {
        //     const post = {
        //       dong: dong.dong,
        //     };
        //     try {
        //       await Axios.post("/api/gil", post).then(async function (res) {
        //         await setGildata(res.data);
        //       });
        //     } catch (error) {
        //       console.log(error);
        //     }
        //   };
        // await makelist();
        // } else {
        console.log(gildata);
        await setGilst(true);
        // }
      }
    }
  };
  useEffect(() => {
    if (json !== undefined) {
      instast();
    }
  }, [json]);

  // useEffect(() => {
  //   if (gildata !== undefined && !gilst) {
  //     dabongsta();
  //   }
  //   if (gilst && gildata !== undefined) {
  //     setGildata();
  //     setGilst(false);
  //   }

  //   console.log(gilst);
  // }, [gildata]);
  return (
    <div className="Action">
      <div className="sel">
        {dong.dong === "" ? <p>동을 선택해주세요</p> : <p>{dong.dong}</p>}

        <div className="icons">
          <div className="li" onClick={graph}>
            <BsBarChartFill></BsBarChartFill>
            <p>상권 통계지표</p>
          </div>
          <div className="li" onClick={biyongsta}>
            <BsClipboard></BsClipboard>
            <p>수익성 분석</p>
          </div>
          <div className="li" onClick={instast}>
            <FiInstagram></FiInstagram>
            <p>SNS 통계지표</p>
          </div>
          <div className="li" onClick={dabongsta}>
            <FaRegThumbsUp></FaRegThumbsUp>
            <p>길 추천</p>
          </div>
          <div className="li" onClick={chuist}>
            <BsGraphUp></BsGraphUp>
            <p>추이 분석</p>
          </div>
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
          <Insta json1={json}></Insta>
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
          <Biyongop dong={dong.dong}></Biyongop>
        </div>
      ) : (
        <p></p>
      )}
      {chui ? (
        <div className="option">
          <Chuihyung dong={dong.dong}></Chuihyung>
        </div>
      ) : (
        <p></p>
      )}
      {gilst ? (
        <div className="option">
          <Gilcuchun dong={dong.dong} json={gildata}></Gilcuchun>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};
export default Action;
