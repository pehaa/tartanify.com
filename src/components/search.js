import React, { useState, useRef } from "react"
import lunr, { Index } from "lunr"
import { Link, graphql, useStaticQuery } from "gatsby"
const SEARCH_QUERY = graphql`
  query SearchIndexQuery {
    AllSearchIndexLunr
  }
`
const Search = () => {
  const inputEl = useRef(null)
  const [value, setValue] = useState("")
  const [results, setResults] = useState([])
  const { AllSearchIndexLunr } = useStaticQuery(SEARCH_QUERY)
  const index = Index.load(AllSearchIndexLunr.index)
  const { store } = AllSearchIndexLunr
  console.log(index)
  const handleChange = e => {
    const query = e.target.value
    setValue(query)
    const keywords = query
      .replace(/\*/g, "")
      .trim()
      .toLowerCase()
      .split(/\s+/)

    try {
      /*  const search = keywords.some(el => el.length < 2)
        ? []
        : index.search(`*${query}*`).map(({ ref }) => {
            return {
              path: ref,
              ...store[ref],
            }
          }) */

      const search = keywords.some(el => el.length < 2)
        ? []
        : index
            .query(function(query) {
              keywords.forEach(el => {
                query.term(el, {})
                query.term(el, {
                  wildcard:
                    lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING,
                })
                query.term(el, {
                  wildcard: lunr.Query.wildcard.LEADING,
                })
                query.term(el, {
                  wildcard: lunr.Query.wildcard.TRAILING,
                })
              })
            })
            .map(({ ref }) => {
              return {
                path: ref,
                ...store[ref],
              }
            })
      setResults(search)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="search-wrapper">
      <div role="search">
        <input
          ref={inputEl}
          type="search"
          value={value}
          onChange={handleChange}
          placeholder="Search Tartans by Name"
        />
        {value && (
          <button
            type="button"
            aria-label="Reset search"
            onClick={e => {
              handleChange(e)
              inputEl.current.focus()
            }}
          >
            x
          </button>
        )}
      </div>
      <ul>
        {results.map(result => (
          <li key={result.path}>
            <Link to={`/tartan/${result.path}`}>{result.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Search
