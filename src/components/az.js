import React from "react"
import TransitionLink from "gatsby-plugin-transition-link"
import usePagesAZOrder from "../hooks/user-pagesAZOrder.js"

const AZ = () => {
  const edges = usePagesAZOrder()
  return (
    <nav>
      <TransitionLink
        exit={{
          length: 0.5,
        }}
        entry={{
          delay: 0,
          length: 0.5,
        }}
        to="/"
      >
        Home
      </TransitionLink>
      <TransitionLink
        exit={{
          length: 0.5,
        }}
        entry={{
          delay: 0,
          length: 0.5,
        }}
        to="/about"
      >
        About
      </TransitionLink>
      {/*<h2>Tartans in Alphabetical order</h2>*/}
      <ul className="az-list title-font">
        {edges.map(({ node }) => {
          const letter = node.path.charAt(node.path.length - 1)
          return (
            <li key={letter}>
              <TransitionLink
                exit={{
                  length: 0.5,
                  trigger: ({ node, e, exit, entry }) =>
                    console.log(node, e, exit, entry),
                }}
                entry={{
                  delay: 0,
                  length: 0.5,
                }}
                to={node.path}
              >
                {letter.toUpperCase()}
              </TransitionLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default AZ
