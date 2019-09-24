import React from "react"
import Header from "./header.js"
import Footer from "./footer.js"
import AZ from "./az.js"
import logo from "../assets/logo-header.svg"
import "../styles/global.css"
import { Link } from "gatsby"
import TransitionLink from "gatsby-plugin-transition-link"

export default ({ children }) => {
  return (
    <>
      <main className="wrapper">
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
        <div className="content">{children}</div>
        <Footer />
      </main>
      <div className="sidebar">
        <nav></nav>
        <AZ />
      </div>
    </>
  )
}
