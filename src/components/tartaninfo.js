import React from "react"
import Info from "../components/info.js"
import MyLink from "../components/mylink.js"

const TartanInfo = ({ previous, next, name, originURL, transitionStatus }) => {
  return (
    <div className={`info info-${transitionStatus}`}>
      <h1 className="title-font etiquette">
        <span>{name}</span>
        <Info className="info-icon" url={originURL} />
      </h1>

      <nav className="nav">
        {previous && (
          <MyLink
            className="prev"
            to={`/tartan/${previous.fields.slug}`}
            rel="prev"
          >
            <span className="icon">&lsaquo;</span>
            <span className="hide-m">{previous.fields.Unique_Name}</span>
          </MyLink>
        )}
        {next && (
          <MyLink
            className="next"
            to={`/tartan/${next.fields.slug}`}
            rel="next"
          >
            <span className="hide-m">{next.fields.Unique_Name}</span>
            <span className="icon">&rsaquo;</span>
          </MyLink>
        )}
        <Info className="info-icon hide-plus" url={originURL} />
      </nav>
    </div>
  )
}

export default TartanInfo
