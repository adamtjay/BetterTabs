import React from "react";

export default function Tab(props) {
  return (
    <div className="tab-row">
      <button className="tab">
        {props.tab.icon ? (
          <img src={props.tab.icon} alt={props.tab.name} className="tab-icon" />
        ) : (
          ""
        )}
        {props.tab.name}
      </button>
    </div>
  );
}
