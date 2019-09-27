import React from "react"
import logo from "../assets/logo-header.svg"
import TransitionLink from "gatsby-plugin-transition-link"
const Header = () => {
  return (
    <>
      <TransitionLink
        exit={{
          length: 0.5,
        }}
        entry={{
          length: 0.5,
        }}
        className="logo-link"
        to="/"
      >
        <img className="logo" src={logo} alt="tartanify.io" />
      </TransitionLink>
    </>
  )
}

export default Header
