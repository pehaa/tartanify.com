import React from "react"
import Layout from "../components/layout"
import Header from "../components/header"
import SvgBg from "../components/svgbg"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const dataBg = useStaticQuery(graphql`
    {
      tartansCsv(fields: { slugg: { eq: "aceo" } }) {
        Palette
        Threadcount
        Name
      }
    }
  `)
  return (
    <Layout>
      <SEO
        description={`A ready-to use collection of tartan patterns. All availabe for download as seamless repetitive tiles in svg and png format.`}
        title={`Welcome!`}
      ></SEO>
      <SvgBg
        palette={dataBg.tartansCsv.Palette}
        threadcount={dataBg.tartansCsv.Threadcount}
        name={dataBg.tartansCsv.slugg}
      />
      <section className="etiquette section-all-tartans">
        <header>
          <h1>Tartan Patterns Collection - v2</h1>
          <p>
            A huge collection of tartan patterns. All ready to download and use
            as seamless repetitive tiles in SVG and PNG formats.
          </p>
        </header>
        <h2>Hello world!</h2>
      </section>
    </Layout>
  )
}
