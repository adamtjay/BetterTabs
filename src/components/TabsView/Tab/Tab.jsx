import React from "react";
import TabOptions from "./TabOptions/TabOptions";

export default function Tab(props) {
  return (
    <div className="tab-row">
      <button className="tab">
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
