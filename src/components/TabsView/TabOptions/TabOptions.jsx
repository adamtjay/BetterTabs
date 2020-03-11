/*global chrome*/
import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

export default function TabOptions(props) {
  function closeTab(id) {
    chrome.tabs.remove(id, () => {
      // query X times to account for varying times in closing tabs
      setIntervalX(() => props.getCurrentTabs(), 100, 3);
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
      <HighlightOffIcon
        className="icon-close"
        onClick={() => closeTab(props.tab.id)}
      />
    </div>
  );
}
