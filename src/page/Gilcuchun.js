import React, { useState, useEffect } from "react";
import Axios from "axios";

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
        <div>
          <p>1</p>
          {list.map(i => (
            <p key={i.gil}>
              {" "}
              {i.gil} {i.avg평균매출}
            </p>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Gilcuchun;
