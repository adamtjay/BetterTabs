import React, { Component } from "react";
import "../../css/App.css";
import TabsView from "../../components/TabsView/TabsView";
import SettingsIcon from '@material-ui/icons/Settings';

export default class MainWindow extends Component {
  render() {
    return (
      <div className="main-window">
        <div className="main-header">
          <SettingsIcon className="settings-icon" fontSize="large" />
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
