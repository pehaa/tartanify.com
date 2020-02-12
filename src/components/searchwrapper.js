import React from "react"

import Search from "./search"
import Header from "./header"
import Share from "./share"
import AZ from "./az"
const SearchWrapper = ({ children }) => (
  <>
    <Header />
    {children}
    <Search />
    <div className="sidebar">
      <nav>
        <AZ />
        <Share className="share-link" />
      </nav>
    </div>
  </>
)

export default SearchWrapper
