import React from "react"
import icon from "../assets/icons-share.svg"

const Share = ({ className }) => {
  const message = encodeURIComponent(
    "Tartanify.com - Tartan Patterns Collection - 5k+ free tartan patterns in SVG and PNG format."
  )
  return (
    <a
      className={className}
      href={`https://twitter.com/intent/tweet?text=${message}&url=https://tartanify.com&via=PeHaa%20and%20@Joevains`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={icon}
        width="24"
        height="24"
        alt="Share on Twitter - opens in new window"
      />
      <span>Share on Twitter</span>
    </a>
  )
}

export default Share
