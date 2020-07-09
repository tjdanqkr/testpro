import React, { useState } from "react";
import { FiArrowRightCircle, FiList } from "react-icons/fi";
import "../css/Biyong.css";
function Biyong() {
  const [g, setG] = useState(0);
  const [b, setB] = useState(0);
  const [d, setD] = useState(0);
  const [i, setI] = useState(0);
  const [build, setBuild] = useState(0);
  const [inte, setInte] = useState(0);
  const [sul, setSul] = useState(0);
  const [ga, setGa] = useState(0);
  const [gita, setGita] = useState(0);
  const [chong, setChong] = useState(0);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [ingun, setIngun] = useState(0);
  const [zeryo, setZeryo] = useState(0);
  const [gita2, setGita2] = useState(0);
  const [danga, setDanga] = useState(0);

  const OnSubmit = (e) => {
    const post = {
      id: window.sessionStorage.getItem("id"),
      g: g,
      b: b,
      d: d,
      i: i,
      build: build,
      inte: inte,
      sul: sul,
      ga: ga,
      gita: gita,
      chong: chong,
      year: year,
      menth: month,
      ingun: ingun,
      zeryo: zeryo,
      gita2: gita2,
      danga: danga,
    };
    try {
      fetch("/api/biyong", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(post),
      })
        .then((response) => response.text())
        .then((message) => {
          console.log(message);
          window.location.replace("/");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="box">
        <table>
          <thead>
            <tr>
              <th className="title">
                <p>초기 투자비용</p>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th className="text">
                <p>권리금</p>
              </th>
              <th className="inputt">
                <input
                  type="text"
                  name="g"
                  onChange={(e) => setG(e.target.value)}
                ></input>
              </th>
              <th className="text">
                <p>보증금</p>
              </th>
              <th className="inputt">
                <input
                  type="text"
                  name="b"
                  onChange={(e) => setB(e.target.value)}
                ></input>
              </th>
              <th className="text">
                <p>대출금/이자(월간)</p>
              </th>
              <th colSpan="2" className="inputt">
                <input
                  type="text"
                  name="d"
                  onChange={(e) => setD(e.target.value)}
                ></input>
                <p>만원</p>
                <input
                  type="text"
                  name="i"
                  onChange={(e) => setI(e.target.value)}
                ></input>
                <p>%</p>
              </th>
            </tr>

            <tr>
              <th className="text">
                <p>기타 투자비</p>
              </th>
              <th colSpan="6" className="inputt">
                <p>건축비</p>
                {"\t"}
                <input
                  type="text"
                  name="build"
                  onChange={(e) => setBuild(e.target.value)}
                ></input>
                <p>인테리어비</p>
                {"\t"}
                <input
                  type="text"
                  name="inte"
                  onChange={(e) => setInte(e.target.value)}
                ></input>
                <p>설비비</p>
                {"\t"}
                <input
                  type="text"
                  name="sul"
                  onChange={(e) => setSul(e.target.value)}
                ></input>
              </th>
            </tr>

            <tr>
              <th colSpan="6" className="inputt">
                <p>가맹관련</p>
                {"\t"}
                <input
                  type="text"
                  name="ga"
                  onChange={(e) => setGa(e.target.value)}
                ></input>
                <p>기타비용</p>
                {"\t"}
                <input
                  type="text"
                  name="gi"
                  onChange={(e) => setGita(e.target.value)}
                ></input>
              </th>
            </tr>

            <tr>
              <th colSpan="6" className="text">
                <h3>
                  <p>총 투자비/감가상각 기간</p>
                </h3>
              </th>
              <th className="inputt">
                <p>
                  ※ 감가상각 기간은 인테리어나 설비, 집기 등 기간이 지날수록
                  가치가 떨어져 교체해야 하는 시기까지의 기간을 의미
                </p>
                <input
                  type="text"
                  name="chong"
                  onChange={(e) => setChong(e.target.value)}
                ></input>
                <p>만원</p>
                <input
                  type="text"
                  name="year"
                  onChange={(e) => setYear(e.target.value)}
                ></input>
                <p>년</p>
              </th>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th className="title">
                <p>운영비용</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="text">
                <p>월세</p>
              </th>
              <th className="inputt">
                <input
                  type="text"
                  name="month"
                  onChange={(e) => setMonth(e.target.value)}
                ></input>
              </th>
              <th className="text">
                <p>인건비</p>
              </th>
              <th className="inputt">
                <input
                  type="text"
                  name="ingun"
                  onChange={(e) => setIngun(e.target.value)}
                ></input>
              </th>
            </tr>

            <tr>
              <th className="text">
                <p>재료비</p>
              </th>
              <th className="inputt">
                <input
                  type="text"
                  name="zeryo"
                  onChange={(e) => setZeryo(e.target.value)}
                ></input>
              </th>
              <th className="text">
                <p>기타비용</p>
              </th>
              <th className="inputt">
                <input
                  type="text"
                  name="gita2"
                  onChange={(e) => setGita2(e.target.value)}
                ></input>
              </th>
            </tr>

            <tr>
              <th className="text">
                <p>객 단가 ※ 1명의 고객이 1회 결제 시 이용하는 평균금액</p>
              </th>
              <th className="inputt">
                <input
                  type="text"
                  name="danga"
                  onChange={(e) => setDanga(e.target.value)}
                ></input>
              </th>
            </tr>
            <tr>
              <th>
                <div className="end">
                  <p>제출하기</p>
                  <FiArrowRightCircle onClick={OnSubmit}></FiArrowRightCircle>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Biyong;
