/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { produce } from "immer";
import { Bar } from "react-chartjs-2";
import "../css/insta.css";

function insta(json1) {
  const [words, setWords] = useState("");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [jsondata, setJsondata] = useState();
  const [load, setLoad] = useState(false);
  const [json, setJson] = useState();
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: [],
        backgroundColor: [],
        borderColor: [],
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
            tempLabels.push(jsondata[i].tag);
            tempDatasets.push(jsondata[i].count);
            console.log(jsondata[i].tag);
          }
          for (let i = 0; i < tempDatasets.length; i++) {
            tempDatasetbackcol.push(palete[0]);
          }
        }
      }

      setData(
        produce(draft => {
          draft.labels = tempLabels;
          draft.datasets[0]["data"] = tempDatasets;
          draft.datasets[0]["borderColor"] = tempDatasetbackcol;
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
  // useEffect(() => {
  //   statera();
  //   console.log(load);
  //   console.log(data);
  // }, [words, date1, date2]);
  const onClick = () => {
    setLoad(true);
  };

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
    "rgb(55, 155, 255)",
    "rgb(255,155,255)",
    "rgb(255,55,255)",
    "rgb(55,155,255)",
    "rgb(55,0,255)",
    "rgb(0,0,155)",
    "rgb(0,0,55)",
    "rgb(0,0,0)",
    "rgb(0,255,0)",
    "rgb(55,255,0)",
    "rgb(255,0,155)",
    "rgb(255,55,55)",
    "rgb(255,55,155)",
    "rgb(255,155,255)",
    "rgb(255,255,255)",
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
        {/* <button onClick={onClick}>클릭</button> */}
      </div>
      <div className="graph">
        {jsondata !== undefined ? (
          <Bar
            width={300}
            height={300}
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
          ></Bar>
        ) : (
          <p>로딩중...</p>
        )}
      </div>
    </div>
  );
}

export default insta;
