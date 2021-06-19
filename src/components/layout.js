import React from "react"
import Header from "./header"
import Footer from "./footer"
import Share from "./share"
import Az from "./az"

import "../styles/global.css"

const Layout = ({ children }) => {
  return (
    <>
      <main className="wrapper">
        <Header />
        <div className="content">{children}</div>
        <Footer />
      </main>
      <div className="sidebar">
        <nav>
          <Az />
          <Share className="share-link" />
        </nav>
      </div>
    </>
  )
}

export default Layout