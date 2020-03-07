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
  }

  componentDidMount() {
    this.getCurrentTabs();
    // setInterval(() => this.getCurrentTabs(), 2000)  
  }

  render() {
    return (
      <div className="tabs-view">
        {this.state.tabsList.map(tab => {
          return (
            <div className="tab-row">
              <Tab tab={tab} />
              <TabOptions
                tab={tab}
                getCurrentTabs={this.getCurrentTabs}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
