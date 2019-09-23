import React from "react"
import Layout from "../components/layout.js"
import SvgBg from "../components/svgbg"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const dataBg = useStaticQuery(graphql`
    {
      tartansCsv(fields: { slugg: { eq: "argentina" } }) {
        Palette
        Threadcount
        Name
      }
    }
  `)
  return (
    <Layout>
      <SEO
        description={`All about the Tartanify project.`}
        title={`About`}
      ></SEO>
      <SvgBg
        palette={dataBg.tartansCsv.Palette}
        threadcount={dataBg.tartansCsv.Threadcount}
        name={dataBg.tartansCsv.slugg}
      />
      <section className="etiquette section-all-tartans">
        <header>
          <h1 class="title-font">About this project</h1>
        </header>
      </section>
    </Layout>
  )
}
