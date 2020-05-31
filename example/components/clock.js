import React from "react"
// import "./clock.scss";

const pad = (n) => (n < 10 ? `0${n}` : n)

const format = (t) =>
  `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(t.getUTCSeconds())}`

const Clock = ({ lastUpdate, light }) => (
  <div className={light ? 'light' : ''}>
    {format(new Date(lastUpdate))}
    {/*<style jsx>{styles}</style>*/}
  </div>
)

export default Clock
