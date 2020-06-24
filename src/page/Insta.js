/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { produce } from "immer";
import { Bar, Pie } from "react-chartjs-2";
import "../css/insta.css";

function insta(json1) {
  const [words, setWords] = useState("");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [jsondata, setJsondata] = useState();
  const [load, setLoad] = useState(false);
  const [json, setJson] = useState();
  const [diningcode, setDiningcode] = useState();
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
        borderWidth: 2,
        data: [],
      },
    ],
  });

  const setword = e => {
    setWords(e.target.value);
    setLoad(false);
  };
  const setdate1 = e => {
    setDate1(e.target.value);
    setLoad(false);
  };
  const setdate2 = e => {
    setDate2(e.target.value);
    setLoad(false);
  };
  const setjson = async () => {
    if (words && date1 && date2 !== "") {
      const post = {
        word: words,
        date1: date1,
        date2: date2,
      };
      try {
        await Axios.post("/api/instar", post).then(async function (response) {
          await setJsondata(response.data);

          console.log(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const makedata = () => {
    try {
      const tempLabels = [];
      const tempDatasets = [];
      const tempDatasetbackcol = [];

      if (jsondata.length !== 0) {
        if (jsondata.status !== 500) {
          for (let i = 0; i < jsondata.length; i++) {
            if (jsondata[i].tag === undefined) {
              tempLabels.push(jsondata[i].dong);
            } else {
              tempLabels.push(jsondata[i].tag);
            }

            tempDatasets.push(jsondata[i].count);
            //console.log(jsondata[i].tag);
          }
          for (let i = 0; i < tempDatasets.length; i++) {
            tempDatasetbackcol.push(palete[i]);
          }
        }
      }

      setData(
        produce(draft => {
          draft.labels = tempLabels;
          draft.datasets[0]["data"] = tempDatasets;
          draft.datasets[0]["hoverBackgroundColor"] = tempDatasetbackcol;
          draft.datasets[0]["backgroundColor"] = tempDatasetbackcol;
          return draft;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const date = async () => {
    Axios.get("/api/instar2").then(async function (res) {
      await setJson(res.data);
    });
  };
  const diningdate = async () => {
    const post = {
      gu: diningcode,
    };
    Axios.post("/api/dining", post).then(async function (res) {
      await setJsondata(res.data);
      console.log(res.data);
    });
  };
  const dining = async e => {
    setDiningcode(e.target.value);
  };
  // useEffect(() => {
  //   statera();
  //   console.log(load);
  //   console.log(data);
  // }, [words, date1, date2]);
  const onClick = () => {
    setLoad(true);
  };
  useEffect(() => {
    diningdate();
  }, [diningcode]);
  useEffect(() => {
    if (
      date1.substring(date2.length - 2, date2.length) >
      date2.substring(date2.length - 2, date2.length)
    ) {
      alert("date2 가 작습니다.");
      setDate2("");
    }
  }, [date1, date2]);
  useEffect(() => {
    if (words && date1 && date2 !== "") {
      setjson();
    }
  }, [words, date1, date2]);
  useEffect(() => {
    if (jsondata !== undefined) {
      makedata();
    }
  }, [jsondata]);

  const palete = [
    "#01579B",
    "#0277BD",
    "#0288D1",
    "#039BE5",
    "#03A9F4",
    "#29B6F6",
    "#4FC3F7",
    "#81D4FA",
    "#B3E5FC",
    "#E1F5FE",
  ];
  return (
    <div className="insta">
      <div className="bar">
        <select className="lists" onChange={setword}>
          <option>업종선택</option>

          <option value="insta강남구맛집">강남구맛집</option>
          <option value="insta강남구카페">강남구카페</option>
          <option value="insta관악구맛집">관악구맛집</option>
          <option value="insta관악구카페">관악구카페</option>
          <option value="insta광진구맛집">광진구맛집</option>
          <option value="insta광진구카페">광진구카페</option>
          <option value="insta동대문구맛집">동대문구맛집</option>
          <option value="insta동대문구카페">동대문구카페</option>
          <option value="insta서초구맛집">서초구맛집</option>
          <option value="insta서초구카페">서초구카페</option>
          <option value="insta성동구맛집">성동구맛집</option>
          <option value="insta성동구카페">성동구카페</option>
          <option value="insta성북구맛집">성북구맛집</option>
          <option value="insta성북구카페">강남구카페</option>
          <option value="insta송파구맛집">송파구맛집</option>
          <option value="insta송파구카페">송파구카페</option>
          <option value="insta용산구맛집">용산구맛집</option>
          <option value="insta용산구카페">용산구카페</option>
          <option value="insta중구맛집">중구맛집</option>
          <option value="insta중구카페">중구카페</option>
        </select>
        <select className="lists" onChange={setdate1}>
          <option>시작</option>
          {json1.json1.length !== 0 ? (
            json1.json1.map(index => (
              <option key={index} value={index}>
                {index}
              </option>
            ))
          ) : (
            <></>
          )}
        </select>
        <select className="lists" onChange={setdate2}>
          <option>끝</option>
          {json1.json1.length !== 0 ? (
            json1.json1.map(index => (
              <option key={index} value={index}>
                {index}
              </option>
            ))
          ) : (
            <></>
          )}
        </select>
        <select className="lists" onClick={dining}>
          <option> 다이닝 코드</option>
          <option value="마포구">마포구</option>
          <option value="송파구">송파구</option>
          <option value="강남구">강남구</option>
        </select>
        {/* <button onClick={onClick}>클릭</button> */}
      </div>
      <div className="graph">
        {jsondata !== undefined ? (
          <Pie
            width={250}
            height={200}
            data={data}
            options={{
              title: {
                display: true,
                text: words + " " + date1 + " - " + date2,
                fontSize: 20,
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
                      stepSize: 10, // 스케일에 대한 사용자 고정 정의 값
                    },
                  },
                ],
              },
              legend: {
                display: false,
                position: "right",
              },
            }}
          ></Pie>
        ) : (
          <p>로딩중...</p>
        )}
      </div>
    </div>
  );
}

export default insta;
