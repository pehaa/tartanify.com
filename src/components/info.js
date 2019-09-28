import React from "react"
import icon from "../assets/icons-informations.svg"

const Info = props => {
  return (
    <a
      className={props.className}
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={icon}
        width="16"
        height="16"
        alt="More information - opens in a new window"
      />
    </a>
  )
}

export default Info
