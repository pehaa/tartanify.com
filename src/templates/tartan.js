import React from "react"
import Layout from "../components/layout.js"
import TartanSvg from "../components/svgbg.js"
import TartanSvgDownLoad from "../components/tartandownloadsvg.js"
import TartanPngDownLoad from "../components/tartandownloadpng.js"
import { graphql } from "gatsby"
import TransitionLink from "gatsby-plugin-transition-link"
import SEO from "../components/seo"

export const query = graphql`
  query($id: String!) {
    tartansCsv(id: { eq: $id }) {
      Category
      Name
      Palette
      Threadcount
      fields {
        Uniquename
      }
    }
  }
`
class BlogPostTemplate extends React.Component {
  render() {
    const pageContext = this.props.pageContext
    const tartansCsv = this.props.data.tartansCsv
    const uniqueName = tartansCsv.fields.Uniquename
    const description = `You can download here this beautiful seamless ${uniqueName} tartan pattern. It's aavilable both as an svg file or in a PNG format.`
    console.log(uniqueName)
    return (
      <Layout>
        <SEO title={uniqueName} description={description}></SEO>
        <TartanSvg
          palette={tartansCsv.Palette}
          threadcount={tartansCsv.Threadcount}
          name={pageContext.slugg}
        />
        <div className={`info info-${this.props.transitionStatus}`}>
          <h1 className="title-font etiquette">
            <span>{uniqueName}</span>
          </h1>
          <nav>
            {pageContext.previous && (
              <TransitionLink
                exit={{
                  length: 0.5,
                }}
                entry={{
                  length: 0.5,
                }}
                className="prev"
                to={`/tartan/${pageContext.previous.fields.slugg}`}
                rel="prev"
              >
                <span className="icon">&lsaquo;</span>
                <span className="hide-m">
                  {pageContext.previous.fields.Uniquename}
                </span>
              </TransitionLink>
            )}
            {pageContext.next && (
              <TransitionLink
                exit={{
                  length: 0.5,
                }}
                entry={{
                  delay: 0,
                  length: 0.5,
                }}
                className="next"
                to={`/tartan/${pageContext.next.fields.slugg}`}
                rel="next"
              >
                <span className="hide-m">
                  {pageContext.next.fields.Uniquename}
                </span>
                <span className="icon">&rsaquo;</span>
              </TransitionLink>
            )}
          </nav>
        </div>
        <div className="downloads">
          <TartanSvgDownLoad
            palette={tartansCsv.Palette}
            threadcount={tartansCsv.Threadcount}
            name={pageContext.slugg}
          />
          <TartanPngDownLoad
            palette={tartansCsv.Palette}
            threadcount={tartansCsv.Threadcount}
            name={pageContext.slugg}
          />
        </div>
      </Layout>
    )
  }
}
export default BlogPostTemplate
