import React from "react"
import Info from "./info.js"
import TartanNavigation from "./tartannavigation.js"

const TartanInfo = ({ previous, next, name, originURL, transitionStatus }) => {
  return (
    <div className={`info info-${transitionStatus}`}>
      <h1 className="title-font etiquette">
        <span>{name}</span>
        <Info className="info-icon" url={originURL} />
      </h1>
      <TartanNavigation previous={previous} next={next} originURL={originURL} />
    </div>
  )
}

export default TartanInfo
