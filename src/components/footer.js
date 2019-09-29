import React from "react"
import useSiteMetadata from "../hooks/user-sitemetadata.js"
import MyLink from "./mylink"

const Footer = () => {
  const { author } = useSiteMetadata()
  return (
    <footer>
      <p>
        Woven with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        by {author}. Please check the{" "}
        <MyLink className="underlined-link" to="/terms-of-use">
          Terms of Use.
        </MyLink>
      </p>
    </footer>
  )
}

export default Footer
