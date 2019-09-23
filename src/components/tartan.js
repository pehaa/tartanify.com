import React from "react"
import SvgBg from "./svgbg.js"

const TartanSvg = props => {
  return (
    <SvgBg
      style={props.style}
      palette={props.palette}
      threadcount={props.threadcount}
    />
  )
}

export default TartanSvg
