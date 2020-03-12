/*global chrome*/
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

export default function Tab(props) {
  function openTab(id) {
    chrome.tabs.update(id, { selected: true });
  }

  function createTabWithUrl(url) {
    chrome.tabs.create({ url: url }, () => {});
  }

  const domainName = props.tab.url
    .replace(/https?:\/\/(?:www\.)?/, "")
    .split("/")[0];

  return (
    <Tooltip title={domainName} placement="left">
      <button
        id={props.tab.id}
        className={"tab" + (props.tab.active ? " tab-active" : "")}
        onClick={() => {
          console.log(props.tabType);
          props.tabType === "active"
            ? openTab(props.tab.id)
            : createTabWithUrl(props.tab.url);
        }}
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
    </Tooltip>
  );
}
