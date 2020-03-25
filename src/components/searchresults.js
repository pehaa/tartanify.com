import React from "react"
import { Link } from "gatsby"

const SearchResults = ({ results }) => (
  <div className="search-results">
    {results.length ? (
      <>
        <h2>
          {results.length} tartan{results.length === 1 ? "" : `s`} matched your
          query
        </h2>
        <ul>
          {results.map(result => (
            <li key={result.slug}>
              <Link to={`/tartan/${result.slug}`}>{result.title}</Link>
            </li>
          ))}
        </ul>
      </>
    ) : (
      <p>Sorry, no matches found.</p>
    )}
  </div>
)

export default SearchResults
