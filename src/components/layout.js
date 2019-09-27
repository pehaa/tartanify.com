import React from "react"
import Header from "./header.js"
import Footer from "./footer.js"
import AZ from "./az.js"

import "../styles/global.css"

export default ({ children }) => {
  return (
    <>
      <main className="wrapper">
        <Header />
        <div className="content">{children}</div>
        <Footer />
      </main>
      <div className="sidebar">
        <AZ />
      </div>
    </>
  )
}
