import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Axios from "axios";
import produce from "immer";

const Chuihyung = dong => {
  const palete = ["rgb(55, 155, 255)"];
  const [dong1, setDong1] = useState(dong.dong);
  const [chuidata, setChuidata] = useState();
  const [gil, setGil] = useState("");
  const [gillist, setGillist] = useState([]);

  const makejson1 = async () => {
    const post = {
      dong: dong.dong,
    };
    await Axios.post("/api/chui", post).then(async function (res) {
      await setChuidata(res.data);
      await console.log(res.data);
    });
  };

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: gil,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  });

  const makejson = async () => {
    const post = {
      dong: dong.dong,
    };
    await Axios.post("/api/chui", post).then(async function (res) {
      await setChuidata(res.data);
      await console.log(chuidata);
      return res.data;
    });
  };
  const gillistset = async () => {
    let list = [];
    for (let i = 0; i < chuidata.length; i++) {
      if (i !== 0) {
        if (chuidata[i].상권_코드_명 !== chuidata[i - 1].상권_코드_명) {
          await list.push(chuidata[i].상권_코드_명);
        }
      }
    }
    await setGillist(list);
  };
  const gilst = async e => {
    await setGil(e.target.value);
  };

  const makedata = () => {
    try {
      const tempLabels = [];
      const tempDatasets = [];
      const tempDatasetbackcol = [];

      if (chuidata.length !== 0) {
        if (chuidata.status !== 500) {
          for (let i = 0; i < chuidata.length; i++) {
            if (gil === chuidata[i].상권_코드_명) {
              tempLabels.push(
                chuidata[i].기준_년_코드 + (chuidata[i].기준_분기_코드 - 1) / 4
              );
              tempDatasets.push(parseInt(chuidata[i].분기별_매출));
              //console.log(chuidata[i].분기별_매출);
            }
            for (let i = 0; i < tempDatasets.length; i++) {
              tempDatasetbackcol.push(palete[0]);
            }
          }
        }
      }

      setData(
        produce(draft => {
          draft.datasets[0]["label"] = gil;
          draft.labels = tempLabels;
          draft.datasets[0]["data"] = tempDatasets;
          //   draft.datasets[0]["borderColor"] = tempDatasetbackcol;
          //   draft.datasets[0]["backgroundColor"] = tempDatasetbackcol;
          return draft;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDong1(dong.dong);
    makejson1();
  }, [dong.dong]);
  useEffect(() => {
    console.log(chuidata);
    if (chuidata !== undefined) {
      gillistset();
    }
  }, [chuidata]);
  useEffect(() => {
    makedata();
  }, [gil]);
  return (
    <div>
      <select onClick={gilst} className="lists">
        <option></option>
        {gillist.map(gill => {
          return (
            <option key={gill} value={gill}>
              {gill}
            </option>
          );
        })}
      </select>
      {chuidata !== undefined ? <Line data={data}></Line> : <></>}
    </div>
  );
};

export default Chuihyung;
