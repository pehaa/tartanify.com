import React from "react"
import useSiteMetadata from "../hooks/user-sitemetadata.js"
const Header = () => {
  const { title, description } = useSiteMetadata()
  return (
    <header>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  )
}

export default Header
