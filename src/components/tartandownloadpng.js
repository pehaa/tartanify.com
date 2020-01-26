import React, { useRef, useEffect } from "react"
import svgAsString from "./svgasstring"

const DownLoadAsPng = ({ svg, name }) => {
  const aEl = useRef(null)

  const size = svg.props.width
  const string = svgAsString(svg)
  useEffect(() => {
    console.log("will use effect")
    const canvas = document.createElement("canvas")
    // multiply by 2 for high-res screens
    canvas.width = 2 * size
    canvas.height = 2 * size
    const ctx = canvas.getContext("2d")
    // multiply by 2 for high-res screens
    ctx.scale(2, 2)
    let img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      aEl.current.setAttribute("href", canvas.toDataURL("image/png"))
    }
    img.src = `data:image/svg+xml,${string}`
  }, [string, size])

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a id={svg.name} ref={aEl} download={`${name}.png`} href-lang="image/png">
      <span className="icon">&rsaquo;</span>{" "}
      <span className="download-text">
        <span className="hide-sm">Download as </span>PNG
      </span>
      <small className="hide-sm">{`(${2 * size}x${2 * size}px)`}</small>
    </a>
  )
}

export default DownLoadAsPng
