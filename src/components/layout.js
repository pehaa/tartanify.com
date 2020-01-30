import React from "react"
import Header from "./header"
import Footer from "./footer"
import Share from "./share"
import AZ from "./az"

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
        <nav>
          <AZ />
          <Share className="share-link" />
        </nav>
      </div>
    </>
  )
}
