import React from "react"
import useSiteMetadata from "../hooks/user-sitemetadata.js"

const Footer = () => {
  const { author } = useSiteMetadata()
  return (
    <footer>
      <p>Woven with ❤️by {author}</p>
    </footer>
  )
}

export default Footer
