import React, { Component } from "react";

export default class TabsView extends Component {
  constructor(props) {
    super(props);
  }

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
    const style = {
      backgroundColor: "#777",
      width: "300px"
    };

    return (
      <div>
        {this.state.activeTabs.map(tab => {
          return <p> {tab.name} </p>;
        })}
      </div>
    );
  }
}
