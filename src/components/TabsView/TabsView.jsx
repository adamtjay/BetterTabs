/*global chrome*/
import React, { Component } from "react";
import Tab from "./Tab/Tab";
import TabOptions from "./TabOptions/TabOptions";

export default class TabsView extends Component {
  state = {
    tabsList: []
  };

  getCurrentTabs = () => {
    let queriedTabs = [];
    chrome.tabs.query({ currentWindow: true }, tabs => {
      tabs.forEach(tab => {
        let tabObject = {
          id: tab.id,
          name: tab.title,
          active: tab.active,
          pinned: tab.pinned,
          windowId: tab.windowId,
          icon: tab.favIconUrl,
          url: tab.url
        };
        queriedTabs.push(tabObject);
      });
      // Sort by newest
      queriedTabs.sort((a, b) => {
        return -1;
      });
      // Bring Active tab to top
      // queriedTabs.sort((a, b) => {
      //   return a.active ? -1 : 0;
      // });

      localStorage.setItem("tabsManaged", JSON.stringify(queriedTabs));
      let storedTabs = JSON.parse(localStorage.getItem("tabsManaged"));
      console.log("localStorage: ", storedTabs);

      this.setState((prevState, props) => ({
        tabsList: storedTabs
      }));
    });
  };

  componentDidMount() {
    this.getCurrentTabs();
    chrome.sessions.getRecentlyClosed({}, sessions => {
      console.log("sessions: ", sessions);
      for (let session of sessions) {
        console.log(session.tab.title);
      }
    });
  }

  render() {
    return (
      <div className="tabs-view">
        {this.state.tabsList.map(tab => {
          return (
            <div className={"tab-row" + (tab.active ? " tab-active" : "")}>
              <Tab tab={tab} />
              <TabOptions tab={tab} getCurrentTabs={this.getCurrentTabs} />
            </div>
          );
        })}
      </div>
    );
  }
}
