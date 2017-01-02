import React from "react";
import { Link } from "react-router";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div id="app-content">
          { this.props.children }
        </div>
        <Footer />
      </div>
    );
  }
}
