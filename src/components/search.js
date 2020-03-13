import React, { useState, useRef } from "react"
import lunr, { Index } from "lunr"
import { Link, graphql, useStaticQuery } from "gatsby"
import iconClose from "../assets/icons-close.svg"
import iconSearch from "../assets/icons-search.svg"

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
  const handleChange = e => {
    const query = e.target.value || ""
    setValue(query)
    const keywords = query
      .replace(/\*/g, "")
      .trim()
      .toLowerCase()
      .split(/\s+/)

    try {
      let search = []
      if (!keywords.some(el => el.length < 2)) {
        keywords.forEach((el, i) => {
          const elSearch = index
            .query(function(query) {
              query.term(el, { editDistance: el.length > 5 ? 1 : 0 })
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
            .map(({ ref }) => {
              return {
                path: ref,
                ...store[ref],
              }
            })
          search =
            i > 0
              ? search.filter(x => elSearch.some(el => el.path === x.path))
              : elSearch
        })
      }
      setResults(search)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="search-wrapper">
        <div role="search">
          <img src={iconSearch} width="16" height="16" alt="" />
          <input
            className={
              value.length ? "search-input" : "search-input mobile-minified"
            }
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
              <img src={iconClose} width="16" height="16" alt="" />
            </button>
          )}
        </div>
        {!!value && (
          <div className="search-results">
            <h2>
              {!!results.length && (
                <>
                  {results.length} tartan{results.length === 1 ? "" : `s`}{" "}
                  matched your query
                </>
              )}
              {!results.length && <>Sorry, no matches found.</>}
            </h2>
            <ul>
              {results.map(result => (
                <li key={result.path}>
                  <Link to={`/tartan/${result.path}`}>{result.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
export default Search
