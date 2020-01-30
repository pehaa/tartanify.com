import React from "react"

const SvgDownloadLink = ({ svgData, fileName }) => {
  return (
    <a
      download={`${fileName}.svg`}
      href-lang="image/svg+xml"
      href={`data:image/svg+xml;utf8,${svgData}`}
    >
      <span className="icon">&rsaquo;</span>{" "}
      <span className="download-text">
        <span className="hide-sm">Download as </span>SVG
      </span>
      <small className="hide-sm">Vector format</small>
    </a>
  )
}

export default SvgDownloadLink
