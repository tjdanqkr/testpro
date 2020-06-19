/*global kakao*/
import React, { useEffect, useState, useMemo, useCallback } from "react";
import a from "../json/dong1.geojson";
import $ from "jquery";
import "../css/Map.css";
import { Link } from "react-router-dom";
import Action from "./Action";

function Map() {
  const [sig_cd1, setSig_cd1] = useState("");
  const [gu, setGu] = useState("");
  const [message, setMessage] = useState("");
  const [dong, setDong] = useState("");
  const [fa, setFa] = useState("");
  const [fanum, setFanum] = useState();
  const [jsondata, setJsondata] = useState(Object);
  const [btn1, setBtn1] = useState("btn");
  const [btn2, setBtn2] = useState("btn");
  const [btn3, setBtn3] = useState("btn");
  const [btn4, setBtn4] = useState("btn");
  const [btn5, setBtn5] = useState("btn");
  const [btn6, setBtn6] = useState("btn");
  const [btn7, setBtn7] = useState("btn");
  const [btn8, setBtn8] = useState("btn");
  const [btn9, setBtn9] = useState("btn");
  const [btn10, setBtn10] = useState("btn");

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
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=5f5809befc934f9413253553bc2551f6&autoload=false";
    document.head.appendChild(script);
    script.onload = () => {
      kakao.maps.load(() => {
        // var el = document.getElementById("map");
        var mapContainer = document.getElementById("map"), // 지도를 표시할 div
          mapOption = {
            center: new kakao.maps.LatLng(37.536, 127.0), // 지도의 중심좌표
            level: 8, // 지도의 확대 레벨
          };

        var map = new kakao.maps.Map(mapContainer, mapOption);
        var customOverlay = new kakao.maps.CustomOverlay();

        $.getJSON(a, function (geojson) {
          var data = geojson.features;
          var coordinates = []; //좌표 저장할 배열
          var name = ""; //행정 구 이름
          var sig_cd = "";

          $.each(data, function (index, val) {
            coordinates = val.geometry.coordinates;
            sig_cd = val.properties.SIG_CD;
            name = val.properties.EMD_KOR_NM;

            displayArea(coordinates, name, sig_cd, jsondata);
          });
        });

        var polygons = []; //function 안 쪽에 지역변수로 넣으니깐 폴리곤 하나 생성할 때마다 배열이 비어서 클릭했을 때 전체를 못 없애줌.  그래서 전역변수로 만듦.

        //행정구역 폴리곤
        function displayArea(coordinates, name, sig_cd, jsondata) {
          var path = []; //폴리곤 그려줄 path
          var points = []; //중심좌표 구하기 위한 지역구 좌표들
          let j = 0;
          $.each(coordinates[0][0], function (index, coordinate) {
            //console.log(coordinates)를 확인해보면 보면 [0]번째에 배열이 주로 저장이 됨.  그래서 [0]번째 배열에서 꺼내줌.

            var point = new Object();
            point.x = coordinate[1];
            point.y = coordinate[0];
            points.push(point);
            path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0])); //new daum.maps.LatLng가 없으면 인식을 못해서 path 배열에 추가
          });

          if (jsondata === {}) {
          } else {
            let i = 0;
            for (i = 0; i < jsondata.length; i++) {
              if (jsondata[i].dong === name) {
                j = jsondata[i].count;
              }
            }
          }

          let fillColor = "rgb(220,220,220)";
          if (j >= 0 && j < 20) {
            fillColor = "	rgb(220,220,220)";
          }
          if (j >= 20 && j < 50) {
            fillColor = "rgb(192,192,192)";
          }
          if (j >= 50 && j < 70) {
            fillColor = "rgb(128,128,128)";
          }
          if (j >= 70 && j < 100) {
            fillColor = "rgb(105,105,105)";
          }
          if (j >= 100) {
            fillColor = "rgb(0,0,0)";
          }

          // 다각형을 생성합니다
          var polygon = new kakao.maps.Polygon({
            map: map, // 다각형을 표시할 지도 객체
            path: path,
            strokeWeight: 2,
            strokeColor: "rgb(255,255,255)",
            strokeOpacity: 0.8,
            fillColor: fillColor,
            fillOpacity: 0.7,
          });

          polygons.push(polygon); //폴리곤 제거하기 위한 배열

          // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 해당 지역 확대을 확대합니다.
          kakao.maps.event.addListener(polygon, "click", function () {
            setDong(name);
          });
          kakao.maps.event.addListener(polygon, "mouseover", function (
            mouseEvent
          ) {
            polygon.setOptions({
              fillColor: "#09f",
            });

            customOverlay.setContent(
              '<div className="mouse" style="position: absolute;background: #fff;border: 1px solid #888;border-radius: 3px;font-size: 12px;top: -15px;left: 20px;padding: 2px;">' +
                "<p>" +
                name +
                " " +
                j +
                "개입니다" +
                "</p> </div>"
            );

            customOverlay.setPosition(mouseEvent.latLng);
            customOverlay.setMap(map);
          });
          kakao.maps.event.addListener(polygon, "mouseout", function () {
            polygon.setOptions({
              fillColor: fillColor,
            });
            customOverlay.setMap(null);
          });
        }
      });
    };
  }, [jsondata]);
  useEffect(() => {
    console.log(fa);
    if (jsondata === undefined) {
      josndatamake();
    }
  }, [fa]);
  const namei = () => {
    console.log(dong);
  };

  const josndatamake = async e => {
    const post = {
      classes: e,
    };
    try {
      await fetch("/api/upjong", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          charset: "utf-8",
        },
        body: JSON.stringify(post),
      })
        .then(response => response.text())
        .then(async function (message) {
          await setJsondata(JSON.parse(message));
        });
    } catch (error) {
      console.log(error);
    }
  };
  const onsel1 = async e => {
    if (btn1 === "btn") {
      setBtn10("btn");
      setBtn2("btn");
      setBtn3("btn");
      setBtn4("btn");
      setBtn5("btn");
      setBtn6("btn");
      setBtn7("btn");
      setBtn8("btn");
      setBtn9("btn");

      setBtn1("onbtn");
      let fa1 = e.target.value;
      await josndatamake(fa1);

      await setFa(fa1);
    } else {
      setBtn1("btn");

      await setFa("");
    }
  };
  const onsel2 = async e => {
    if (btn2 === "btn") {
      setBtn1("btn");
      setBtn10("btn");
      setBtn3("btn");
      setBtn4("btn");
      setBtn5("btn");
      setBtn6("btn");
      setBtn7("btn");
      setBtn8("btn");
      setBtn9("btn");

      setBtn2("onbtn");
      let fa1 = e.target.value;
      await josndatamake(fa1);
      console.log(fa1);
      await setFa(fa1);
    } else {
      setBtn2("btn");
    }
  };
  const onsel3 = async e => {
    if (btn3 === "btn") {
      setBtn1("btn");
      setBtn2("btn");
      setBtn10("btn");
      setBtn4("btn");
      setBtn5("btn");
      setBtn6("btn");
      setBtn7("btn");
      setBtn8("btn");
      setBtn9("btn");

      setBtn3("onbtn");
      let fa1 = e.target.value;
      await josndatamake(fa1);
      console.log(fa1);
      await setFa(fa1);
    } else {
      setBtn3("btn");
    }
  };
  const onsel4 = async e => {
    if (btn4 === "btn") {
      setBtn1("btn");
      setBtn2("btn");
      setBtn3("btn");
      setBtn10("btn");
      setBtn5("btn");
      setBtn6("btn");
      setBtn7("btn");
      setBtn8("btn");
      setBtn9("btn");

      setBtn4("onbtn");
      let fa1 = e.target.value;
      await josndatamake(fa1);
      console.log(fa1);
      await setFa(fa1);
    } else {
      setBtn4("btn");
    }
  };
  const onsel5 = async e => {
    if (btn5 === "btn") {
      setBtn1("btn");
      setBtn2("btn");
      setBtn3("btn");
      setBtn4("btn");
      setBtn10("btn");
      setBtn6("btn");
      setBtn7("btn");
      setBtn8("btn");
      setBtn9("btn");

      setBtn5("onbtn");
      let fa1 = e.target.value;
      await josndatamake(fa1);
      console.log(fa1);
      await setFa(fa1);
    } else {
      setBtn5("btn");
    }
  };
  const onsel6 = async e => {
    if (btn6 === "btn") {
      setBtn1("btn");
      setBtn2("btn");
      setBtn3("btn");
      setBtn4("btn");
      setBtn5("btn");
      setBtn10("btn");
      setBtn7("btn");
      setBtn8("btn");
      setBtn9("btn");

      setBtn6("onbtn");
      let fa1 = e.target.value;
      await josndatamake(fa1);
      console.log(fa1);
      await setFa(fa1);
    } else {
      setBtn6("btn");
    }
  };
  const onsel7 = async e => {
    if (btn7 === "btn") {
      setBtn1("btn");
      setBtn2("btn");
      setBtn3("btn");
      setBtn4("btn");
      setBtn5("btn");
      setBtn6("btn");
      setBtn10("btn");
      setBtn8("btn");
      setBtn9("btn");

      setBtn7("onbtn");
      let fa1 = e.target.value;
      await josndatamake(fa1);
      console.log(fa1);
      await setFa(fa1);
    } else {
      setBtn7("btn");
    }
  };
  const onsel8 = async e => {
    if (btn8 === "btn") {
      setBtn1("btn");
      setBtn2("btn");
      setBtn3("btn");
      setBtn4("btn");
      setBtn5("btn");
      setBtn6("btn");
      setBtn7("btn");
      setBtn10("btn");
      setBtn9("btn");

      setBtn8("onbtn");
      let fa1 = e.target.value;
      await josndatamake(fa1);
      console.log(fa1);
      await setFa(fa1);
    } else {
      setBtn8("btn");
    }
  };
  const onsel9 = async e => {
    console.log("핫원");
    if (btn9 === "btn") {
      setBtn1("btn");
      setBtn2("btn");
      setBtn3("btn");
      setBtn4("btn");
      setBtn5("btn");
      setBtn6("btn");
      setBtn7("btn");
      setBtn8("btn");
      setBtn10("btn");

      setBtn9("onbtn");
      let fa1 = e.target.value;
      await josndatamake(fa1);
      console.log(fa1);
      await setFa(fa1);
    } else {
      setBtn9("btn");
    }
  };

  // const func1 = useCallback(()=>{
  //   // 무언가 실행함
  // },[??])

  const onsel10 = async e => {
    if (btn10 === "btn") {
      setBtn1("btn");
      setBtn2("btn");
      setBtn3("btn");
      setBtn4("btn");
      setBtn5("btn");
      setBtn6("btn");
      setBtn7("btn");
      setBtn8("btn");
      setBtn9("btn");

      setBtn10("onbtn");
      let fa1 = e.target.value;
      await josndatamake(fa1);
      console.log(fa1);
      await setFa(fa1);
    } else {
      setBtn10("btn");
    }
  };
  const OnSubmit = e => {};
  return (
    <>
      <div className="map" id="map"></div>
      <Action dong={dong} fa={fanum}></Action>
      <div className="list">
        <button className={btn1} onClick={onsel1} value="커피전문점/카페/다방">
          커피전문점/카페/다방
        </button>
        <button className={btn2} onClick={onsel2} value="한식/백반/한정식">
          한식
        </button>
        <button className={btn3} onClick={onsel3} value="라면김밥분식">
          분식
        </button>
        <button className={btn4} onClick={onsel4} value="음식점-일식">
          일식
        </button>
        <button className={btn5} onClick={onsel5} value="편의점">
          편의점
        </button>
        <button className={btn6} onClick={onsel6} value="호프/맥주">
          호프/맥주
        </button>
        <button className={btn7} onClick={onsel7} value="중국음식/중국집">
          중국음식/중국집
        </button>
        <button className={btn8} onClick={onsel8} value="패스트푸드">
          패스트푸드
        </button>
        <button className={btn9} onClick={onsel9} value="학원(종합)">
          학원(종합)
        </button>
        <button className={btn10} onClick={onsel10} value="안경원">
          안경원
        </button>

        {/* <ul>
          <li value="커피전문점/카페/다방">커피전문점/카페/다방</li>
          <li value="한식/백반/한정식">한식</li>
          <li value="라면김밥분식">분식</li>
          <li value="음식점-일식">일식</li>
          <li value="편의점">편의점</li>
          <li value="호프/맥주">호프/맥주</li>
          <li value="중국음식/중국집">중국음식/중국집</li>
          <li value="패스트푸드">패스트푸드</li>
          <li value="학원(종합)">학원</li>
          <li value="안경원">안경원</li>
        </ul> */}
        {/* <select onClick={onsel}>
          <option></option>
          <option value="커피전문점/카페/다방">커피전문점/카페/다방</option>
          <option value="한식/백반/한정식">한식</option>
          <option value="라면김밥분식">분식</option>
          <option value="음식점-일식">일식</option>
          <option value="편의점">편의점</option>
          <option value="호프/맥주">호프/맥주</option>
          <option value="중국음식/중국집">중국음식/중국집</option>
          <option value="패스트푸드">패스트푸드</option>
          <option value="학원(종합)">학원</option>
          <option value="안경원">안경원</option>
        </select> */}
      </div>

      {/* <form onSubmit={OnSubmit} >
        <input type="submit" value="전송"></input>

      </form> */}
      {/* <button onClick={namei}>구이름</button> */}

      {/* {(window.sessionStorage.getItem("message")!==""?(<img src={window.sessionStorage.getItem("message")}></img>) :(<p>이미지가 없음 </p>))} */}
    </>
    //<Test></Test>
    //<Test2></Test2>
  );
}

export default Map;
