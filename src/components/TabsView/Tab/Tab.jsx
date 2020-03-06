/*global chrome*/
import React from "react";
import TabOptions from "./TabOptions/TabOptions";

export default function Tab(props) {
  function openTab(id) {
    chrome.tabs.update(id, { selected: true });
  }

  return (
    <div className="tab-row">
      {props.tab.active ? <div className="tab-active-marker" /> : <div />}
      <button
        id={props.tab.id}
        className={"tab" + (props.tab.active ? " tab-active" : "")}
        onClick={() => openTab(props.tab.id)}
      >
        <div className="tab-icon">
          {props.tab.icon ? (
            <img src={props.tab.icon} alt={props.tab.name} />
          ) : (
            ""
          )}
        </div>
        <div className="tab-content">{props.tab.name}</div>
      </button>
      <TabOptions />
    </div>
  );
}
