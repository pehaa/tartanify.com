import React from "react"
import usePagesAZOrder from "../hooks/usepagesAZOrder"
import MyLink from "./mylink.js"

const AZ = () => {
  const nodes = usePagesAZOrder()
  return (
    <>
      <MyLink to="/">Home</MyLink>
      <MyLink to="/about">About</MyLink>
      {/*<h2>Tartans in Alphabetical order</h2>*/}
      <ul className="az-list title-font">
        {nodes.map(({ path }) => {
          const letter = path.charAt(path.length - 1)
          return (
            <li key={letter}>
              <MyLink
                activeStyle={{ color: "white" }}
                partiallyActive={true}
                to={path}
              >
                {letter.toUpperCase()}
              </MyLink>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default AZ
