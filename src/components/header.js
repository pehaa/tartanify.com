import React from "react"
import { useStaticQuery } from "gatsby"
import logo from "../assets/logo-header.svg"
import MyLink from "./mylink"

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
