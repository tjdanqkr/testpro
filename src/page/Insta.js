/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { produce } from "immer";
import { Bar } from "react-chartjs-2";
import "../css/insta.css";

function insta() {
  const [words, setWords] = useState("");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [jsondata, setJsondata] = useState();
  const [load, setLoad] = useState(false);
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

  const setword = (e) => {
    setWords(e.target.value);
    setLoad(false);
  };
  const setdate1 = (e) => {
    setDate1(e.target.value);
    setLoad(false);
  };
  const setdate2 = (e) => {
    setDate2(e.target.value);
    setLoad(false);
  };
  async function statera() {
    if (words && date1 && date2 !== "") {
      setJsondata();
      const post = {
        word: words,
        date1: date1,
        date2: date2,
      };
      try {
        Axios.post("/api/instar", post).then(function (response) {
          setJsondata(response.data);

          console.log(response.data);
          return response.data;
        });
      } catch (error) {
        console.log(error);
      }

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
              tempDatasetbackcol.push(palete[i]);
            }
          }
        }

        setData(
          produce((draft) => {
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
    }
  }
  // useEffect(() => {
  //   statera();
  //   console.log(load);
  //   console.log(data);
  // }, [words, date1, date2]);
  const onClick = () => {
    setLoad(true);
  };
  useEffect(() => {
    statera();
    console.log(load);
    console.log(data);
  }, [load]);
  const palete = [
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

          <option value="insta카페">카페</option>
          <option value="insta한식당">한식당</option>
        </select>
        <select className="lists" onChange={setdate1}>
          <option>시작</option>
          <option value="2020-06-03">2020-06-03</option>
          <option value="2020-06-04">2020-06-04</option>
          <option value="2020-06-05">2020-06-05</option>
          <option value="2020-06-06">2020-06-06</option>
          <option value="2020-06-07">2020-06-07</option>
          <option value="2020-06-08">2020-06-08</option>
          <option value="2020-06-09">2020-06-09</option>
          <option value="2020-06-10">2020-06-10</option>
          <option value="2020-06-11">2020-06-11</option>
          <option value="2020-06-12">2020-06-12</option>
          <option value="2020-06-13">2020-06-13</option>
          <option value="2020-06-14">2020-06-14</option>
          <option value="2020-06-15">2020-06-15</option>
          <option value="2020-06-16">2020-06-16</option>
        </select>
        <select className="lists" onChange={setdate2}>
          <option>끝</option>
          <option value="2020-06-03">2020-06-03</option>
          <option value="2020-06-04">2020-06-04</option>
          <option value="2020-06-05">2020-06-05</option>
          <option value="2020-06-06">2020-06-06</option>
          <option value="2020-06-07">2020-06-07</option>
          <option value="2020-06-08">2020-06-08</option>
          <option value="2020-06-09">2020-06-09</option>
          <option value="2020-06-10">2020-06-10</option>
          <option value="2020-06-11">2020-06-11</option>
          <option value="2020-06-12">2020-06-12</option>
          <option value="2020-06-13">2020-06-13</option>
          <option value="2020-06-14">2020-06-14</option>
          <option value="2020-06-15">2020-06-15</option>
          <option value="2020-06-16">2020-06-16</option>
        </select>
        <button onClick={onClick}>클릭</button>
      </div>
      <div className="graph">
        {jsondata !== null ? (
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
