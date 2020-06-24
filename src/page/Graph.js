import React, { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import Axios from "axios";
import { produce } from "immer";

function Graph(dong, fa) {
  const [graphop, setGraphop] = useState("");
  const [list, setList] = useState("");
  const [dong1, setDong1] = useState(dong.dong);
  const [datat, setDatat] = useState();
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
  let listset = [];
  let jsondata = [];
  const totaldata = async () => {
    const dataset3 = [];
    const post = {
      bub: dong.dong,
    };
    try {
      let devtools;
      await fetch("/api/graph", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(post),
      })
        .then(response => response.json())
        .then(message => {
          setList(message);
          listset.push(message);
        });

      let max = 0;
      let maxname = [];
      let maxtitle = "";
      if (listset[0].gun.length < listset[0].zip.length) {
        max = listset[0].zip.length;
        maxname = listset[0].zip;
        maxtitle = "집객력";
      } else {
        max = listset[0].gun.length;
        maxname = listset[0].gun;
        maxtitle = "상권지표";
      }
      if (max < listset[0].gu.length) {
        max = listset[0].gu.length;
        maxname = listset[0].gu;
        maxtitle = "구매력";
      }
      if (max < listset[0].sung.length) {
        max = listset[0].sung.length;
        maxname = listset[0].sung;
        maxtitle = "성장성";
      }
      console.log(listset[0]);
      console.log(maxtitle);
      console.log(maxname);
      console.log(max);

      let labels = [];
      let label = "";
      let data = [];
      let backcol = [];
      for (let i = 0; i < maxname.length; i++) {
        label = maxtitle;
        labels.push(maxname[i].sang);
        data.push(maxname[i].score);
        backcol.push(palete[0]);
      }
      let datatools = {
        label: maxtitle,
        data: data,
        backgroundColor: backcol,
      };
      dataset3.push(datatools);
      let dataz = [];
      let backcolz = [];
      let k = 0;

      if (JSON.stringify(listset[0].zip) !== JSON.stringify(maxname)) {
        dataz = [];
        backcolz = [];
        label = "집객력";

        k = 0;
        for (let q = 0; q < max; q++) {
          for (let j = 0; j < listset[0].zip.length; j++) {
            if (listset[0].zip[j].sang === labels[q]) {
              console.log(listset[0].zip[j].sang + " @ " + labels[q]);
              dataz.push(listset[0].zip[j].score);
              console.log(dataz);
              break;
            }
            if (
              j === listset[0].zip.length - 1 &&
              listset[0].zip[j].sang !== labels[q]
            ) {
              dataz.push(0);
            }
          }

          backcolz.push(palete[1]);
        }
        devtools = {
          label: label,
          data: dataz,
          backgroundColor: backcolz,
        };
        dataset3.push(devtools);
      }

      if (JSON.stringify(listset[0].gun) !== JSON.stringify(maxname)) {
        dataz = [];
        backcolz = [];

        k = 0;
        label = "상권지표";
        for (let j = 0; j < listset[0].gun.length; j++) {
          for (let q = 0; q < max; q++) {
            if (listset[0].gun[j].sang !== labels[q]) {
            } else {
              dataz.push(listset[0].gun[j].score);

              break;
            }
            if (q === max - 1 && listset[0].gun[j].sang !== labels[q]) {
              dataz.push(0);
              j--;
            }
          }

          backcolz.push(palete[2]);
        }
        devtools = {
          label: label,
          data: dataz,
          backgroundColor: backcolz,
        };
        dataset3.push(devtools);
      }

      if (JSON.stringify(listset[0].gu) !== JSON.stringify(maxname)) {
        label = "구매력";
        dataz = [];
        backcolz = [];
        k = 0;
        for (let j = 0; j < listset[0].gu.length; j++) {
          for (let q = 0; q < max; q++) {
            if (listset[0].gu[j].sang !== labels[q]) {
            } else {
              dataz.push(listset[0].gu[j].score);

              break;
            }
            if (q === max - 1 && listset[0].gu[j].sang !== labels[q]) {
              dataz.push(0);
              j--;
            }
          }

          backcolz.push(palete[3]);
        }
        devtools = {
          label: label,
          data: dataz,
          backgroundColor: backcolz,
        };
        dataset3.push(devtools);
      }

      if (JSON.stringify(listset[0].sung) !== JSON.stringify(maxname)) {
        label = "성장성";
        dataz = [];
        backcolz = [];
        k = 0;
        for (let j = 0; j < listset[0].sung.length; j++) {
          for (let q = 0; q < max; q++) {
            if (listset[0].sung[j].sang !== labels[q]) {
            } else {
              dataz.push(listset[0].sung[j].score);
              break;
            }
            if (q === max - 1 && listset[0].sung[j].sang !== labels[q]) {
              dataz.push(0);
              j--;
            }
          }

          backcolz.push(palete[4]);
        }

        devtools = {
          label: label,
          data: dataz,
          backgroundColor: backcolz,
        };
        dataset3.push(devtools);
      }

      let final = { labels: labels, datasets: dataset3 };
      setDatat(final);
      console.log(dataset3);
      console.log(datat);
    } catch (e) {
      console.log(e);
    }
  };
  async function makeData() {
    const post = {
      bub: dong.dong,
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
          console.log(message.gu[0].sang);
          setList(message);
          listset.push(message);
        });

      if (graphop === "상권지표") {
        jsondata.push(listset[0].gun);
      } else if (graphop === "집객력") {
        jsondata.push(listset[0].zip);
      } else if (graphop === "구매력") {
        jsondata.push(listset[0].gu);
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
              tempLabels.push(jsondata[0][i].sang);
              tempDatasets.push(jsondata[0][i].score);
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
    "#B3E5FC",
    "#81D4FA",
    "#4FC3F7",
    "#29B6F6",
  ];
  const graphlistop = e => {
    setGraphop(e.target.value);
  };
  useEffect(() => {
    totaldata();
  }, [dong.dong]);
  return (
    <>
      <p>{dong.dong + " " + graphop}</p>
      <div className="graphlist">
        {/* <button className="lists" onClick={graphlistop} value="상권지표">
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
        </button> */}

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
          data={datat}
          options={{
            title: {
              display: true,
              // text: dong.dong + " " + graphop,
              fontSize: 20,
            },
            scales: {
              xAxes: [
                {
                  stacked: true,
                },
              ],
              yAxes: [
                {
                  stacked: true,
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
