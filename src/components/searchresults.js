import React from "react"
import { Link } from "gatsby"

const SearchResults = ({ results }) => (
  <div className="search-results">
    <h2>
      {!!results.length && (
        <>
          {results.length} tartan{results.length === 1 ? "" : `s`} matched your
          query
        </>
      )}
      {!results.length && <>Sorry, no matches found.</>}
    </h2>
    <ul>
      {results.map(result => (
        <li key={result.slug}>
          <Link to={`/tartan/${result.slug}`}>{result.title}</Link>
        </li>
      ))}
    </ul>
  </div>
)

export default SearchResults
