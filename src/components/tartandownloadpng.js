import React, { useRef, useEffect } from "react"

const TartanRawSvg = props => {
  const aEl = useRef(null)
  useEffect(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 2 * props.svg.size
    canvas.height = 2 * props.svg.size
    const ctx = canvas.getContext("2d")
    ctx.scale(2, 2)
    let img = new Image()
    img.src = `data:image/svg+xml, ${encodeURIComponent(props.svg.svg)}`
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      aEl.current.setAttribute("href", canvas.toDataURL("image/png"))
    }
  }, [aEl])
  return (
    <a
      id={props.svg.name}
      ref={aEl}
      //id="png-download"
      download={`${props.name}.png`}
      href-lang="image/png"
    >
      <span className="icon">&rsaquo;</span>{" "}
      <span className="download-text">
        <span className="hide-sm">Download as </span>PNG
      </span>
      <small className="hide-sm">{`(${2 * props.svg.size}x${2 *
        props.svg.size}px)`}</small>
    </a>
  )
}

export default TartanRawSvg
