import React from "react"
import Layout from "../components/layout"
import SvgRaw from "../components/svgraw.js"
import SvgBg from "../components/svgbg.js"
import MyLink from "../components/mylink"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const dataBg = useStaticQuery(graphql`
    {
      tartansCsv(fields: { slugg: { eq: "davis" } }) {
        Threadcount
        fields {
          Optimisedpalette
        }
      }
    }
  `)
  const svg = SvgRaw({
    palette: dataBg.tartansCsv.fields.Optimisedpalette,
    threadcount: dataBg.tartansCsv.Threadcount,
  })
  return (
    <Layout>
      <SEO
        description={`A ready-to use collection of tartan patterns. All available for download as seamless repetitive tiles in svg and png format.`}
        title={`Welcome!`}
      ></SEO>
      <SvgBg svg={svg} />
      <section className="etiquette section-page section-home ">
        <header>
          <h1>
            A 5k+ Collection of{" "}
            <span className="title-font letter">Tartan Patterns</span>
          </h1>
          <p>We've gathered for you over 5000 tartan patters. </p>
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
