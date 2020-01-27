import { useStaticQuery, graphql } from "gatsby"

const usePagesAZOrder = () => {
  const data = useStaticQuery(graphql`
    {
      allSitePage(filter: { path: { regex: "/^/tartans/.$/i" } }) {
        nodes {
          context {
            pageCount
          }
          path
        }
      }
    }
  `)
  return data.allSitePage.nodes
}

export default usePagesAZOrder
