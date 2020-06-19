import React, { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import Axios from "axios";
import { produce } from "immer";

function Graph(dong, fa) {
  const [graphop, setGraphop] = useState("");
  const [list, setList] = useState("");
  const [dong1, setDong1] = useState(dong.dong);
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
  var listset = [];
  var jsondata = [];
  async function makeData() {
    const post = {
      dong: dong.dong,
    };
    try {
      await fetch("/api/graph", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(post),
      })
        .then(response => response.json())
        .then(message => {
          console.log(message);
          setList(message);
          listset.push(message);
        });

      if (graphop === "상권지표") {
        jsondata.push(listset[0].sang);
      } else if (graphop === "집객력") {
        jsondata.push(listset[0].people);
      } else if (graphop === "구매력") {
        jsondata.push(listset[0].Pur);
      } else if (graphop === "성장성") {
        jsondata.push(listset[0].sung);
      }

      const tempLabels = [];
      const tempDatasets = [];
      const tempDatasetbackcol = [];

      if (jsondata.length !== 0) {
        try {
          if (jsondata.status !== 500) {
            for (let i = 0; i < jsondata[0].length; i++) {
              tempLabels.push(jsondata[0][i].gil);
              tempDatasets.push(jsondata[0][i].totalscore);
            }
            for (let i = 0; i < tempDatasets.length; i++) {
              tempDatasetbackcol.push(palete[0]);
            }
          }
        } catch (error) {
          console.log(error);
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
      }
    } catch (e) {
      console.log(e);
    }
  }
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
  const graphlistop = e => {
    setGraphop(e.target.value);
  };
  useEffect(() => {
    makeData();
  }, [graphop, dong.dong]);
  return (
    <>
      <p>{dong.dong + " " + graphop}</p>
      <div className="graphlist">
        <button className="lists" onClick={graphlistop} value="상권지표">
          상권지표
        </button>
        <button className="lists" onClick={graphlistop} value="집객력">
          집객력
        </button>
        <button className="lists" onClick={graphlistop} value="구매력">
          구매력
        </button>
        <button className="lists" onClick={graphlistop} value="성장성">
          성장성
        </button>

        {/* <select onClick={graphlistop} className="lists">
          <option value=""></option>
          <option value="상권지표">상권지표</option>
          <option value="집객력">집객력</option>
          <option value="구매력">구매력</option>
          <option value="성장성">성장성</option>
        </select> */}
      </div>
      <div className="graph">
        <Bar
          width={250}
          height={200}
          data={data}
          options={{
            title: {
              display: true,
              // text: dong.dong + " " + graphop,
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
      </div>
    </>
  );
}

export default Graph;
