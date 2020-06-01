import React from "react";

const IncompatibleView = () => (
  <div className="incompatible-view">
    <img alt="smartphone" src="/icons/smartphone.svg" />
    <p>The site is best viewed on your laptop or desktop</p>
    <p className="info">
      To view on your mobile device, please turn-off the rotation lock and
      view it in landscape mode
    </p>
  </div>
)

export default IncompatibleView;
