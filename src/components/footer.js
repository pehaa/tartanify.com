import React from "react"
import useSiteMetadata from "../hooks/user-sitemetadata.js"
import TransitionLink from "gatsby-plugin-transition-link"

const Footer = () => {
  const { author } = useSiteMetadata()
  return (
    <footer>
      <p>
        Woven with ❤️by {author}. Please check the{" "}
        <TransitionLink
          className="underlined-link"
          exit={{
            length: 0.5,
          }}
          entry={{
            length: 0.5,
          }}
          to="/license"
        >
          Terms of Use.
        </TransitionLink>
      </p>
    </footer>
  )
}

export default Footer
