import React from "react"
import logo from "../assets/logo-header.svg"
import MyLink from "./mylink.js"
const Header = () => {
  return (
    <>
      <MyLink className="logo-link" to="/">
        <img className="logo" src={logo} alt="tartanify.com" />
      </MyLink>
    </>
  )
}

export default Header
