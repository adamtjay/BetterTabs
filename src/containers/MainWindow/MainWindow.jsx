/*global chrome*/
import React, { Component } from "react";
import "../../css/App.css";
import TabsView from "../../components/TabsView/TabsView";

export default class MainWindow extends Component {
  state = {
    tabsList: ""
  };

  getCurrentTabs() {
    let queriedTabs = [];
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
        queriedTabs.push(tabObject);
      });
      // Sort descending
      queriedTabs.sort((a, b) => {
        return -1;
      });
      // Bring Active tab to top
      queriedTabs.sort((a, b) => {
        return a.active ? -1 : 0;
      });

      localStorage.setItem("tabsManaged", JSON.stringify(queriedTabs));
      let storedTabs = JSON.parse(localStorage.getItem("tabsManaged"));
      console.log("localStorage: ", storedTabs);

      this.setState((prevState, props) => ({
        tabsList: storedTabs
      }));
    });
  }

  componentDidMount() {
    this.getCurrentTabs();
  }

  render() {
    return (
      <div className="main-window">
        <h1 style={{ fontSize: "30px" }}>BetterTabs</h1>
        <TabsView tabsList={this.state.tabsList}></TabsView>
      </div>
    );
  }
}
