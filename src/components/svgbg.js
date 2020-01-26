import React from "react"
import svgAsString from "./svgasstring"

const SvgBg = ({ svg, style, className }) => {
  return (
    <div
      className={`bgtartan ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,${svgAsString(svg)}")`,
        ...style,
      }}
    ></div>
  )
}

export default SvgBg
