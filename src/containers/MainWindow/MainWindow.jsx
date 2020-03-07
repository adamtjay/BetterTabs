import React, { Component } from "react";
import "../../css/App.css";
import TabsView from "../../components/TabsView/TabsView";

export default class MainWindow extends Component {

  render() {
    return (
      <div className="main-window">
        <h1 style={{ fontSize: "30px" }}>BetterTabs</h1>
        <TabsView></TabsView>
      </div>
    );
  }
}
