import React, { Component } from "react";
import Tab from '../Tab/Tab';

export default class TabsView extends Component {
  state = {
    activeTabs: [],
    savedTabs: []
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeTabs: nextProps.tabsList
    });
  }

  render() {
    return (
      <div className="tabs-view">
        {this.state.activeTabs.map(tab => {
          return (
            <Tab tab={tab}></Tab>
          );
        })}
      </div>
    );
  }
}
