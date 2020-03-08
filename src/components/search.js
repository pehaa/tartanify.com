import React, { useState, useRef } from "react"
import { Index } from "lunr"
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
  const handleChange = e => {
    const query = e.target.value
    setValue(query)
    if (query[query.length - 1] === "+" || query[query.length - 1] === "-") {
      return
    }
    try {
      const search = index.search(query).map(({ ref }) => {
        return {
          path: ref,
          ...store[ref],
        }
      })
      setResults(search)
    } catch (error) {
      console.log(error)
    }
    if (!query) {
      setResults([])
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        background: "rgba(0,0,0,.1)",
        marginBottom: "2rem",
        zIndex: 100,
        top: 0,
        left: 0,
      }}
    >
      <input
        ref={inputEl}
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="search by name"
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
