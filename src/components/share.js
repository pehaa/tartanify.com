import React from "react"
import icon from "../assets/icons-informations.svg"

const Share = props => {
  const message = encodeURIComponent(
    "Tartanify.com - Tartan Patterns Collection - 5k+ free tartan patterns in SVG and PNG format."
  )
  return (
    <a
      className={props.className}
      href={`https://twitter.com/intent/tweet?text=${message}&url=https://tartanify.com&via=PeHaa`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={icon}
        width="16"
        height="16"
        alt="More information - opens in a new window"
      />
      Share on Twitter
    </a>
  )
}

export default Share
