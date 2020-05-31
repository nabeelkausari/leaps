import * as React from "react";

export const ProgressBar = props => {
  return (
    <div className="simple-progress-wrapper">
      <div className="simple-progress-indicator" style={{ width: props.width }}>
        &nbsp;
      </div>
    </div>
  );
};
