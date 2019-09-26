import React from "react"
import SvgRaw from "./svgraw.js"
class TartanRawSvg extends React.Component {
  constructor(props) {
    super(props)
    this.svg = SvgRaw(this.props)
    this.img = {}
  }
  componentDidMount() {
    const canvas = document.createElement("canvas")
    canvas.width = this.svg.size
    canvas.height = this.svg.size
    const ctx = canvas.getContext("2d")
    this.img.src = `data:image/svg+xml, ${encodeURIComponent(this.svg.svg)}`
    this.img = new Image()
    this.img.onload = () => {
      console.log("loaded", this.props.name)
      ctx.drawImage(this.img, 0, 0)
      this.ref.setAttribute("href", canvas.toDataURL("image/png"))
    }
  }
  componentWillUnmount() {
    if (!this.img) {
      return
    }
    this.img.onload = function() {}
    delete this.img
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
        <small className="hide-sm">{`(${this.svg.size}x${this.svg.size}px)`}</small>
      </a>
    )
  }
}

export default TartanRawSvg
