import React from "react"

const PngDownloadLink = ({ svgData, size, fileName }) => {
  const multiplier = size < 4000 ? 2 : 1
  const doThis = e => {
    const el = e.currentTarget

    if (el.getAttribute("href")) {
      return
    }
    e.preventDefault()
    const text = el.querySelector(".download-text")
    text.innerHTML = `<span className="hide-sm">Generating </span>PNG...`

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
      el.setAttribute("href", canvas.toDataURL("image/png"))
      text.innerHTML = `<span className="hide-sm">Download as </span>PNG`
      setTimeout(() => el.click(), 100)
    }
    img.src = `data:image/svg+xml,${svgData}`
  }

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a download={`${fileName}.png`} onClick={doThis}>
      <span className="icon">&rsaquo;</span>{" "}
      <span className="download-text">
        <span className="hide-sm">Generate </span>PNG
      </span>
      <small className="hide-sm">{`(${multiplier * size}x${multiplier *
        size}px)`}</small>
    </a>
  )
}

export default PngDownloadLink
