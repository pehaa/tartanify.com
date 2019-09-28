import React from "react"
import TransitionLink from "gatsby-plugin-transition-link"

const MyLink = props => {
  return (
    <TransitionLink
      exit={{
        length: 0.5,
      }}
      entry={{
        length: 0.5,
      }}
      {...props}
    >
      {props.children}
    </TransitionLink>
  )
}

export default MyLink
