/*global chrome*/
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

export default function TabOptions(props) {
  function closeTab(id) {
    chrome.tabs.remove(id, () => {
      // query X times to account for varying times in closing tabs
      setIntervalX(() => props.getCurrentTabs(), 100, 5);
    });
  }

  function setIntervalX(callback, delay, repetitions) {
    let x = 0;
    let intervalID = window.setInterval(function() {
      callback();

      if (++x === repetitions) {
        window.clearInterval(intervalID);
      }
    }, delay);
  }

  return (
    <div className="tab-options">
      <Tooltip title="Close Tab">
        <HighlightOffIcon
          className="icon-close"
          onClick={() => closeTab(props.tab.id)}
        />
      </Tooltip>
    </div>
  );
}
