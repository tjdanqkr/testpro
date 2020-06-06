import React, { useEffect, useState } from "react";
import Map from "../page/Map";
import Header from "../page/Header";
import Login from "../page/Login";


function Front() {
  return (
    <div className="Front">
      <Header></Header>
      <Map></Map>
    </div>
  );
}

export default Front;
