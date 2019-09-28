import React from "react"
import usePagesAZOrder from "../hooks/user-pagesAZOrder.js"
import MyLink from "./mylink.js"

const AZ = () => {
  const edges = usePagesAZOrder()
  return (
    <nav>
      <MyLink to="/">Home</MyLink>
      <MyLink to="/about">About</MyLink>
      {/*<h2>Tartans in Alphabetical order</h2>*/}
      <ul className="az-list title-font">
        {edges.map(({ node }) => {
          const letter = node.path.charAt(node.path.length - 1)
          return (
            <li key={letter}>
              <MyLink
                activeStyle={{ color: "white" }}
                partiallyActive={true}
                to={node.path}
              >
                {letter.toUpperCase()}
              </MyLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default AZ
