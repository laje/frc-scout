import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import 'whatwg-fetch'

import Layout from "./Layout"
import About from "./pages/About"
import Home from "./pages/Home"

import Competition from "./pages/Competition"
import Game from "./pages/Game"
import Pit from "./pages/Pit"

import Scouter from "./pages/Scouter"

const app = document.getElementById('app')

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="about" component={About}></Route>

      <Route path="competition" component={Competition}></Route>
      <Route path="pit" component={Pit}></Route>
      <Route path="game" component={Game}></Route>

      <Route path="scouter" component={Scouter}></Route>
    </Route>
  </Router>,
app);