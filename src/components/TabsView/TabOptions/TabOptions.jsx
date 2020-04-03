/*global chrome*/
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import RoomIcon from "@material-ui/icons/Room";

export default function TabOptions(props) {
  function setIntervalX(callback, delay, repetitions) {
    let x = 0;
    let intervalID = window.setInterval(function() {
      callback();

      if (++x === repetitions) {
        window.clearInterval(intervalID);
      }
    }, delay);
  }

  function closeTab(id) {
    // Close tab, by id
    chrome.tabs.remove(id, () => {
      setIntervalX(() => props.getCurrentTabs(), 100, 5);
    });
  }

  function pinUnpinTab(id, isPinned) {
    // Pin or Un-pin tab, by id & current pinned state
    if (!isPinned) {
      chrome.tabs.update(id, { pinned: true }, () => {});
    } else {
      chrome.tabs.update(id, { pinned: false }, () => {});
    }
    setIntervalX(() => props.getCurrentTabs(), 100, 5);
  }

  return (
    <div className="tab-options">
      <Tooltip title="Close">
        <HighlightOffIcon
          className="icon-close"
          onClick={() => closeTab(props.tab.id)}
        />
      </Tooltip>
      <Tooltip title={!props.tab.pinned ? "Pin" : "Un-pin"}>
        {!props.tab.pinned ? (
          <RoomOutlinedIcon
            className="icon-pin"
            onClick={() => pinUnpinTab(props.tab.id, props.tab.pinned)}
          />
        ) : (
          <RoomIcon
            className="icon-pin"
            onClick={() => pinUnpinTab(props.tab.id, props.tab.pinned)}
          />
        )}
      </Tooltip>
    </div>
  );
}
