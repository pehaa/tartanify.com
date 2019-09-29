import React from "react"
import Layout from "../components/layout.js"
import SvgRaw from "../components/svgraw.js"
import SvgBg from "../components/svgbg.js"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const dataBg = useStaticQuery(graphql`
    {
      tartansCsv(fields: { slugg: { eq: "aon" } }) {
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
      <SEO description={`404 error - Page not found.`} title={`404`}></SEO>
      <SvgBg svg={svg} />
      <section className="etiquette section-all-tartans">
        <header>
          <h1 className="title-font">404 - Page not found</h1>
        </header>
        <p>We are sorry, but we can’t find the page you were looking for.</p>
      </section>
    </Layout>
  )
}
