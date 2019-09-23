import { useStaticQuery, graphql } from "gatsby"

const usePagesAZOrder = () => {
  const data = useStaticQuery(graphql`
    {
      allSitePage(filter: { path: { regex: "/^/tartans/.$/i" } }) {
        edges {
          node {
            context {
              pageCount
            }
            path
          }
        }
      }
    }
  `)
  return data.allSitePage.edges
}

export default usePagesAZOrder
