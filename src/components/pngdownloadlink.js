import React, { useRef, useEffect } from "react"

const PngDownloadLink = ({ svgData, size, fileName }) => {
  const aEl = useRef(null)

  useEffect(() => {
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
    img.src = `data:image/svg+xml,${svgData}`
  }, [svgData, size])

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a ref={aEl} download={`${fileName}.png`}>
      <span className="icon">&rsaquo;</span>{" "}
      <span className="download-text">
        <span className="hide-sm">Download as </span>PNG
      </span>
      <small className="hide-sm">{`(${2 * size}x${2 * size}px)`}</small>
    </a>
  )
}

export default PngDownloadLink
