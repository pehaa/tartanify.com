import React from "react"
import SearchWidget from "./searchwidget"

const SearchWrapper = ({ children }) => (
  <>
    {children}
    <SearchWidget />
  </>
)

export default SearchWrapper
