/*global chrome*/
import React, { Component } from "react";
import "../../css/App.css";
import TabsView from "../../components/TabsView/TabsView";

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
  }

  componentDidMount() {
    console.log("component mounted");
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
