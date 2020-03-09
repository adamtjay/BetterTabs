/*global chrome*/
import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

export default function TabOptions(props) {
  function closeTab(id) {
    chrome.tabs.remove(id, () => {});
    setTimeout(() => props.getCurrentTabs(), 100);
  }

  return (
    <div className="tab-options">
      <HighlightOffIcon
        className="icon-close"
        onClick={() => closeTab(props.tab.id)}
      />
    </div>
  );
}
