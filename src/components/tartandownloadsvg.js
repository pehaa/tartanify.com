import React from "react"
import svgAsString from "./svgasstring"

const DownLoadAsSvg = ({ svg, name }) => {
  return (
    <a
      download={`${name}.svg`}
      href-lang="image/svg+xml"
      href={`data:image/svg+xml;utf8,${svgAsString(svg)}`}
    >
      <span className="icon">&rsaquo;</span>{" "}
      <span className="download-text">
        <span className="hide-sm">Download as </span>SVG
      </span>
      <small className="hide-sm">Vector format</small>
    </a>
  )
}

export default DownLoadAsSvg
