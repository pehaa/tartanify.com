import React from "react"
import Layout from "../components/layout.js"
import SvgRaw from "../components/svgraw.js"
import SvgBg from "../components/svgbg.js"
import icon from "../assets/icons-informations.svg"
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
      Origin_URL
      fields {
        Uniquename
        Optimisedpalette
      }
    }
  }
`
class BlogPostTemplate extends React.Component {
  render() {
    const pageContext = this.props.pageContext
    const tartansCsv = this.props.data.tartansCsv
    const uniqueName = tartansCsv.fields.Uniquename
    const svg = SvgRaw({
      palette: tartansCsv.fields.Optimisedpalette,
      threadcount: tartansCsv.Threadcount,
    })
    const description = `You can download here this beautiful seamless ${uniqueName} tartan pattern. It's aavilable both as an svg file or in a PNG format.`
    return (
      <Layout>
        <SEO title={uniqueName} description={description}></SEO>
        <SvgBg svg={svg} />
        <div className={`info info-${this.props.transitionStatus}`}>
          <h1 className="title-font etiquette">
            <span>{uniqueName}</span>
            {tartansCsv.Origin_URL && (
              <a
                className="info-icon hide-sm"
                href={tartansCsv.Origin_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={icon}
                  width="16"
                  height="16"
                  alt="More information - opens in a new window"
                />
              </a>
            )}
          </h1>

          <nav className="nav">
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
            {tartansCsv.Origin_URL && (
              <a
                className="info-icon hide-plus"
                href={tartansCsv.Origin_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={icon}
                  width="16"
                  height="16"
                  alt="More information - opens in a new window"
                />
              </a>
            )}
          </nav>
        </div>
        <div className="downloads">
          <TartanSvgDownLoad svg={svg} name={pageContext.slugg} />
          <TartanPngDownLoad svg={svg} name={pageContext.slugg} />
        </div>
      </Layout>
    )
  }
}
export default BlogPostTemplate
