/*global kakao*/
import React, { useEffect, useState } from "react";
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

          if (fa === "") {
          } else {
            let i = 0;
            for (i = 0; i < jsondata.length; i++) {
              if (jsondata[i].dong === name) {
                j++;
              }
            }
          }

          let fillColor = "#fff";
          if (j >= 0 && j < 20) {
            fillColor = palete[2];
          }
          if (j >= 20 && j < 50) {
            fillColor = palete[1];
          }
          if (j >= 50 && j < 70) {
            fillColor = palete[0];
          }
          if (j >= 70 && j < 100) {
            fillColor = palete[3];
          }
          if (j >= 100) {
            fillColor = palete[4];
          }

          // 다각형을 생성합니다
          var polygon = new kakao.maps.Polygon({
            map: map, // 다각형을 표시할 지도 객체
            path: path,
            strokeWeight: 2,
            strokeColor: "#004c80",
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
              '<div class="area"><p>' +
                name +
                " " +
                j +
                "개입니다" +
                "</p></div>"
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
  }, []);

  const josndatamake = async () => {
    const post = {
      classes: fa,
    };
    await fetch("/api/upjong", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        charset: "utf-8",
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.text())
      .then((message) => {
        setJsondata(JSON.parse(message));
      });
  };
  const namei = () => {
    console.log(dong);
  };
  const onsel = (e) => {
    setFa(e.target.value);

    josndatamake();
  };
  const OnSubmit = (e) => {};
  return (
    <>
      <div className="map" id="map"></div>
      <Action dong={dong} fa={fanum}></Action>
      <div className="list">
        <select onClick={onsel}>
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
        </select>
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
