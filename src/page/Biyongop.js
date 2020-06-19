import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../css/Biyongop.css";
// const cssa = styled(`.table div{
//     float:left;
// }`);

const Biyongop = dong => {
  const [json1, setJson1] = useState();
  const [ma2019, setMa2019] = useState("");
  const [ma2020, setMa2020] = useState("");
  const [dan, setDan] = useState("");
  const [bi, setBi] = useState("");
  const [bi1, setBi1] = useState("");
  const [key1, setKey1] = useState();
  async function b(key1) {
    console.log(key1);
    for (let i = 0; i < json1.length; i++) {
      if (json1[i].gil === key1) {
        await setBi(json1[i].hap);
        await setBi1(json1[i].hap1);
        await setMa2019(json1[i].월별2019매출예측);
        await setMa2020(json1[i].월별2020매출예측);
        await setDan(json1[i].danga);
      }
    }
  }
  const gilst = async e => {
    await b(e.target.value);
  };

  async function a() {
    const post = {
      id: window.sessionStorage.getItem("id"),
      dong: dong.dong,
    };
    try {
      await Axios.post("/api/biyong1", post).then(async res => {
        await setJson1(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    a();
  }, [json1]);

  return (
    <>
      <div className="macul">
        {json1 !== undefined ? (
          json1.length !== 0 ? (
            <>
              <div>
                <select onClick={gilst} className="lists">
                  <option></option>
                  {json1.map(gil => {
                    return (
                      <option key={gil.gil} value={gil.gil}>
                        {gil.gil}
                      </option>
                    );
                  })}
                </select>
              </div>
              {ma2019 !== "" ? (
                <div className="table">
                  <div className="jun">
                    <p>전년도 월평균 매출액</p>
                    <p>{ma2019 + "원"}</p>
                  </div>
                  <div className="hu">
                    <p>금년도 월평균 예상 매출액</p>
                    <p>{ma2020 + "원"}</p>
                  </div>
                  <div className="chong">
                    <p>나의 총 지출액</p>
                    <p>{bi + "만원"}</p>
                  </div>
                  <div className="su">
                    <p>
                      수입률 예측: {parseInt(parseInt(ma2020 / 12) / bi1)} %
                    </p>
                  </div>
                  <div className="son">
                    <p>손익 분기 점: {bi} 만원</p>
                  </div>
                  <div className="dan">
                    <p>
                      카페 창업시 {parseInt((bi1 / dan) * 10000)} 잔 팔아야
                      합니다!
                    </p>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </>
          ) : (
            <p></p>
          )
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Biyongop;
