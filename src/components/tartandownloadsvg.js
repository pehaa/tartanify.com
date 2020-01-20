import React from "react"

const DownLoadAsSvg = ({ svg, name }) => {
  return (
    <a
      download={`${name}.svg`}
      href-lang="image/svg+xml"
      href={`data:image/svg+xml;utf8,${encodeURIComponent(svg.svg)}`}
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
