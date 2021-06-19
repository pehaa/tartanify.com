import React, {useState, useEffect, useRef} from "react"

const PngDownloadLink = ({ svgData, size, fileName }) => {
  const multiplier = size < 4000 ? 2 : 1
  const aRef = useRef(null)
  const [pngReady, setPngReady] = useState(false)
  const [href, setHref] = useState(null)
  useEffect(() => {
    if (href) {
      aRef.current.click()
    }
  }, [href])
  const doThis = () => {
    setPngReady(true)
    const canvas = document.createElement("canvas")
    // multiply by 2 for high-res screens
    canvas.width = multiplier * size
    canvas.height = multiplier * size
    const ctx = canvas.getContext("2d")
    // multiply by 2 for high-res screens
    ctx.scale(multiplier, multiplier)
    let img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      setHref(canvas.toDataURL("image/png"))
    }
    img.src = `data:image/svg+xml,${svgData}`
  }

  return href ? (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a ref={aRef} href={href} download={`${fileName}.png`}>
      <span className="icon">&rsaquo;</span>{" "}
      <span className="download-text">
        <span className="hide-sm">Download as </span>PNG
      </span>
      <small className="hide-sm">{`(${multiplier * size}x${multiplier *
        size}px)`}</small>
    </a>
  ) : (
    <button onClick={doThis}>
      <span className="icon">&rsaquo;</span>{" "}
      <span className="download-text">
        <span className="hide-sm">
            {pngReady ? "Generating..." : "Generate"}
        </span>PNG
      </span>
      <small className="hide-sm">{`(${multiplier * size}x${multiplier *
        size}px)`}</small>
    </button>
  )
}

export default PngDownloadLink
