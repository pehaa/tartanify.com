import React from "react"
import ReactDOMServer from "react-dom/server"

const SvgBg = props => {
  return (
    <div
      className={`bgtartan ${props.className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
          ReactDOMServer.renderToString(props.svg)
        )}")`,
        ...props.style,
      }}
    ></div>
  )
}

export default SvgBg
