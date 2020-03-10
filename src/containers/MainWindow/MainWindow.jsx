/*global chrome*/
import React, { Component } from "react";
import "../../css/App.css";
import TabsView from "../../components/TabsView/TabsView";
import CloseIcon from "@material-ui/icons/Close";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";

export default class MainWindow extends Component {
   createTab = () => {
    chrome.tabs.create({}, () => {});
   }

  render() {
    return (
      <div className="main-window">
        <div className="main-header">
          <AddIcon 
          className="new-tab-icon"
          onClick={() => this.createTab()}
          />
          <SettingsIcon className="main-settings-icon" />
          <CloseIcon
            onClick={() => window.close()}
            className="main-close-icon"
          />
          <h1>BetterTabs</h1>
          <div className="main-options">
            <h4 className="main-option-selected">Active</h4>
            <h4>Recently Closed</h4>
          </div>
        </div>
        <TabsView></TabsView>
      </div>
    );
  }
}
