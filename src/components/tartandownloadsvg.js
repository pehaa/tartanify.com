import React from "react"
import SvgRaw from "./svgraw.js"
class TartanRawSvg extends React.Component {
  render() {
    return (
      <a
        download={`${this.props.name}.svg`}
        href-lang="image/svg+xml"
        href={`data:image/svg+xml;utf8,${encodeURIComponent(
          SvgRaw(this.props).svg
        )}`}
      >
        <span className="icon">&rsaquo;</span>{" "}
        <span className="download-text">
          <span className="hide-sm">Download as </span>SVG
        </span>
        <small className="hide-sm">Vector format</small>
      </a>
    )
  }
}

export default TartanRawSvg
