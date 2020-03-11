/*global chrome*/
import React, { Component } from "react";
import Tab from "./Tab/Tab";
import TabOptions from "./TabOptions/TabOptions";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";

export default class TabsView extends Component {
  state = {
    tabsList: [],
    recentlyClosed: []
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
          url: tab.url,
          audible: tab.audible,
          discarded: tab.disarded
        };
        queriedTabs.push(tabObject);
      });
      // Sort by newest
      queriedTabs.sort((a, b) => {
        return -1;
      });

      this.setState((prevState, props) => ({
        tabsList: queriedTabs
      }));
    });
  };

  getRecentlyClosed = () => {
    chrome.sessions.getRecentlyClosed({}, sessions => {
      let sessionTabs = [];
      sessions.forEach(session => {
        let sessionObject = {
          id: session.tab.id,
          name: session.tab.title,
          windowId: session.tab.windowId,
          icon: session.tab.favIconUrl,
          url: session.tab.url
        };
        sessionTabs.push(sessionObject);
      });

      this.setState((prevState, props) => ({
        recentlyClosed: sessionTabs
      }));
    });
  };

  componentDidMount() {
    this.getCurrentTabs();
    this.getRecentlyClosed();
  }

  render() {
    return (
      <div className="tabs-view">
        {this.props.tabsType === "active"
          ? this.state.tabsList.map(tab => {
              return (
                <div className={"tab-row" + (tab.active ? " tab-active" : "")}>
                  {tab.audible ? <VolumeUpIcon className="audible-icon" /> : ""}
                  <Tab tab={tab} />
                  <TabOptions tab={tab} getCurrentTabs={this.getCurrentTabs} />
                </div>
              );
            })
          : ""}
        {this.props.tabsType === "recent"
          ? this.state.recentlyClosed.map(tab => {
              return (
                <div className="tab-row recently-closed">
                  <Tab tab={tab} tabType={this.props.tabsType} />
                </div>
              );
            })
          : ""}
      </div>
    );
  }
}
