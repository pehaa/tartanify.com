import React from "react"
class TartanRawSvg extends React.Component {
  componentDidMount() {
    const canvas = document.createElement("canvas")
    canvas.width = this.props.svg.size
    canvas.height = this.props.svg.size
    const ctx = canvas.getContext("2d")
    let img = new Image()
    img.src = `data:image/svg+xml, ${encodeURIComponent(this.props.svg.svg)}`
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      this.ref.setAttribute("href", canvas.toDataURL("image/png"))
    }
  }
  render() {
    return (
      <a
        ref={el => (this.ref = el)}
        id="png-download"
        download={`${this.props.name}.png`}
        href-lang="image/png"
      >
        <span className="icon">&rsaquo;</span>{" "}
        <span className="download-text">
          <span className="hide-sm">Download as </span>PNG
        </span>
        <small className="hide-sm">{`(${this.props.svg.size}x${this.props.svg.size}px)`}</small>
      </a>
    )
  }
}

export default TartanRawSvg
