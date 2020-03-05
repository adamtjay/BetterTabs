/*global chrome*/
import React, { Component } from "react";
import { render } from "@testing-library/react";
import TabsView from "./TabsView";

export default class MainWindow extends Component {
  state = {
    tabsList: ""
  };

  getCurrentTabs() {
    let tabsManaged = [];
    chrome.tabs.query({}, tabs => {
      tabs.forEach(tab => {
        let tabObject = {
          name: tab.title,
          active: tab.active,
          pinned: tab.pinned,
          windowId: tab.windowId,
          icon: tab.favIconUrl,
          url: tab.url
        };
        tabsManaged.push(tabObject);
      });
      localStorage.setItem("tabsManaged", JSON.stringify(tabsManaged));
      let storedTabs = JSON.parse(localStorage.getItem("tabsManaged"));
      console.log("localStorage: ", typeof storedTabs, storedTabs);

      this.setState((prevState, props) => ({
        tabsList: storedTabs
      }));
    });
    // return storedTabs;
  }

  componentDidMount() {
    console.log("component mounted");
    this.getCurrentTabs();
  }

  render() {
    const style = {
      width: "100%",
      height: "100%",
      backgroundColor: "#000",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    };

    return (
      <div style={style}>
        <h1 style={{ fontSize: "30px" }}>TabViewer</h1>
        <TabsView tabsList={this.state.tabsList}></TabsView>
      </div>
    );
  }
}
