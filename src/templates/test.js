const PngDownloadLink = ({ tartanData, size, tartanName = "tartan" }) => {
  const aEl = React.createRef()

  React.useEffect(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 2 * size
    canvas.height = 2 * size
    const ctx = canvas.getContext("2d")
    ctx.scale(2, 2)
    let img = new Image()
    img.src = `data:image/svg+xml, ${tartanData}`
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      const href = canvas.toDataURL("image/png")
      aEl.current.setAttribute("href", href)
    }
  }, [])

  return (
    <a className="download-link" ref={aEl} download={`${tartanName}.png`}>
      Download as PNG
    </a>
  )
}
