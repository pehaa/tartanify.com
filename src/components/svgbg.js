import React from "react"
const SvgBg = props => {
  return (
    <div
      className={`bgtartan ${props.className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
          props.svg.svg
        )}")`,
        ...props.style,
      }}
    ></div>
  )
}

export default SvgBg
