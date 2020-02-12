import React, { useState } from "react"
import { Index } from "elasticlunr"

import { Link, useStaticQuery } from "gatsby"

const SEARCH_QUERY = graphql`
  query SearchIndexQuery {
    AllTartansSearchIndex
  }
`

const Search = props => {
  const [value, setValue] = useState("")
  const [results, setResults] = useState([])

  const { AllTartansSearchIndex } = useStaticQuery(SEARCH_QUERY)
  const index = Index.load(AllTartansSearchIndex)
  const handleChange = e => {
    const query = e.target.value
    setValue(query)
    setResults(
      query.length > 2
        ? index
            .search(query, { expand: true })
            // Map over each ID and return the full document
            .map(({ ref }) => index.documentStore.getDoc(ref))
        : []
    )
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
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="search by name"
      />
      <ul>
        {results.map(result => (
          <li key={result.id}>
            <Link to={result.path}>{result.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Search
