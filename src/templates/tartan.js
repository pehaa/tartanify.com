import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout.js"
import SvgTile from "../components/svgtile.js"
import SvgBg from "../components/svgbg.js"
import TartanInfo from "../components/tartaninfo.js"
import svgAsString from "../components/svgasstring"
import SvgDownloadLink from "../components/tartandownloadsvg.js"
import PngDownloadLink from "../components/tartandownloadpng.js"

import SEO from "../components/seo"

export const query = graphql`
  query($id: String!) {
    tartansCsv(id: { eq: $id }) {
      Palette
      Threadcount
      Origin_URL
      fields {
        Unique_Name
      }
    }
  }
`
const TartanTemplate = props => {
  const { previous, next, slug } = props.pageContext
  const { fields, Palette, Threadcount, Origin_URL } = props.data.tartansCsv
  const name = fields.Unique_Name
  const svg = SvgTile({
    palette: Palette,
    threadcount: Threadcount,
  })

  const svgData = svgAsString(svg)
  const svgSize = svg.props.width
  const description = `You can download here this beautiful seamless ${name} tartan pattern. It's available both as an svg file or in a PNG format.`

  return (
    <Layout>
      <SEO title={name} description={description}></SEO>
      <SvgBg svg={svg} />
      <TartanInfo
        name={name}
        previous={previous}
        next={next}
        originURL={Origin_URL}
        transitionStatus={props.transitionStatus}
      ></TartanInfo>
      <div className="downloads">
        <SvgDownloadLink svgData={svgData} fileName={slug} />
        <PngDownloadLink svgData={svgData} size={svgSize} fileName={slug} />
      </div>
    </Layout>
  )
}

export default TartanTemplate
