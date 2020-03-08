import React from "react"
import Search from "./search"

const SearchWrapper = ({ children }) => (
  <>
    {children}
    <Search />
  </>
)

export default SearchWrapper
