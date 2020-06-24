import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../css/Gilcuchen.css";

const Gilcuchun = dong => {
  const [list, setList] = useState();
  const [dong1, setDong] = useState();
  const [first, setFirst] = useState("");
  const [sec, setSec] = useState("");
  const [thi, setThi] = useState("");
  const [four, setFour] = useState("");

  const makelist = async () => {
    const post = {
      dong: dong.dong,
    };
    try {
      await Axios.post("/api/gil", post).then(async function (res) {
        await setList(res.data);
        return res.data;
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    makelist();
  }, [dong.dong]);
  return (
    <div className="comment">
      <div className="first">
        <p>{dong.dong} 의 길 추천은</p>
      </div>
      <div className="second"></div>
      {/* {dong.json !== undefined ? (
        <div>
          <p>1</p>
          {dong.json.map(i => (
            <p key={i.gil}>
              {" "}
              {i.gil} {i.avg평균매출}
            </p>
          ))}
        </div>
      ) : (
        <></>
      )} */}
      {list !== undefined ? (
        <div className="cuchun">
          <div className="af">
            <p>순위</p>
            {list.map((i, index) => (
              <p key={i.gil}> {index + 1}</p>
            ))}
          </div>
          <div class="gname">
            <p>길 이름</p>
            {list.map(i => (
              <p key={i.gil}> {i.gil}</p>
            ))}
          </div>
          <div className="avg">
            <p>평균 매출</p>
            {list.map(i => (
              <p key={i.gil}> {parseInt(i.avg평균매출)}</p>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Gilcuchun;
