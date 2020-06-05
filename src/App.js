import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./tem/Main";
import { connect } from "react-redux";
function App() {
  return (
    <>
      <Route exact path="/" component={Main}></Route>
    </>
  );
}

export default App;
