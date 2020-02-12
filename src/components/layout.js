import React from "react"
import Header from "./header"
import Footer from "./footer"

import "../styles/global.css"

export default ({ children }) => {
  return (
    <>
      <main className="wrapper">
        <div className="content">{children}</div>
        <Footer />
      </main>
    </>
  )
}
