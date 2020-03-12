import React from "react"
import Search from "./search"

const SearchWrapper = ({ children }) => (
  <>
    <Search />
    {children}
  </>
)

export default SearchWrapper
