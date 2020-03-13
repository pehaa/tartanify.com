import React from "react"
import SearchWrapper from "./src/components/searchwrapper"
export const wrapPageElement = ({ element, props }) => (
  <SearchWrapper {...props}>{element}</SearchWrapper>
)
