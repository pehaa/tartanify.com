import React from "react"
import Layout from "../components/layout"
import SvgTile from "../components/svgtile"
import SvgBg from "../components/svgbg"
import MyLink from "../components/mylink"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const dataBg = useStaticQuery(graphql`
    {
      tartansCsv(fields: { slug: { eq: "wallace" } }) {
        Threadcount
        Palette
      }
    }
  `)
  const svg = SvgTile({
    palette: dataBg.tartansCsv.Palette,
    threadcount: dataBg.tartansCsv.Threadcount,
  })
  return (
    <Layout>
      <SEO
        description={`A ready-to use collection of tartan patterns. All available for download as seamless repetitive tiles in svg and png format.`}
        title={`5k+ Tartan Patterns`}
      ></SEO>
      <SvgBg svg={svg} />
      <section className="etiquette section-page section-home ">
        <header>
          <h1>
            A 5k+ Collection of{" "}
            <span className="title-font letter">Tartan Patterns</span>
          </h1>
          <p>We've gathered for you over 5000 tartan patterns. </p>
          <p>
            All ready to download and use as repeating tiles in SVG and PNG
            format.
          </p>
          <p>
            <MyLink className="underlined-link" to="/about">
              Learn more about
            </MyLink>{" "}
            this project, check the{" "}
            <MyLink className="underlined-link" to="/terms-of-use">
              terms of use
            </MyLink>{" "}
            or{" "}
            <MyLink className="underlined-link" to="/tartans/a">
              start browsing.
            </MyLink>
          </p>
        </header>
      </section>
    </Layout>
  )
}
