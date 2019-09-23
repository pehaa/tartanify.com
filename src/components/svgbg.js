import React from "react"
import SvgRaw from "./svgraw.js"
const SvgBg = props => {
  const svg = SvgRaw(props)
  return (
    <div
      className={`bgtartan ${props.className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
          svg.svg
        )}")`,
        ...props.style,
      }}
    ></div>
  )
}

export default SvgBg
