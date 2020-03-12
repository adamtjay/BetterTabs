/*global chrome*/
import React, { Component } from "react";
import "../../css/App.css";
import TabsView from "../../components/TabsView/TabsView";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";

export default class MainWindow extends Component {
  state = {
    tabsType: "active"
  };

  createTab = () => {
    chrome.tabs.create({}, () => {});
  };

  switchTabsType = newType => {
    this.setState({
      tabsType: newType
    });
  };

  render() {
    return (
      <div className="main-window">
        <div className="main-header">
          <Tooltip title="New Tab">
            <AddIcon
              className="new-tab-icon"
              onClick={() => this.createTab()}
            />
          </Tooltip>
          <Tooltip title="Settings">
            <SettingsIcon className="main-settings-icon" />
          </Tooltip>
          <Tooltip title="Close">
            <CloseIcon
              onClick={() => window.close()}
              className="main-close-icon"
            />
          </Tooltip>
          <h1>BetterTabs</h1>
          <div className="main-options">
            <h4
              onClick={() => this.switchTabsType("active")}
              className={
                this.state.tabsType === "active" ? "main-option-selected" : ""
              }
            >
              Active
            </h4>
            <h4
              onClick={() => this.switchTabsType("recent")}
              className={
                this.state.tabsType === "recent" ? "main-option-selected" : ""
              }
            >
              Recently Closed
            </h4>
          </div>
        </div>
        <TabsView tabsType={this.state.tabsType}></TabsView>
      </div>
    );
  }
}
