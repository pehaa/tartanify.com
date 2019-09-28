import React from "react"
import Layout from "../components/layout"
import SvgRaw from "../components/svgraw.js"
import SvgBg from "../components/svgbg.js"
import TransitionLink from "gatsby-plugin-transition-link"
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
      <SEO
        description={`A ready-to use collection of tartan patterns. All available for download as seamless repetitive tiles in svg and png format.`}
        title={`Welcome!`}
      ></SEO>
      <SvgBg svg={svg} />
      <section className="etiquette section-home ">
        <header>
          <h1>
            A 5k+ Collection of{" "}
            <span className="title-font letter">Tartan Patterns</span>
          </h1>
          <p>We've gathered for you 5496 tartan patters. </p>
          <p>
            All ready to download and use as repeating tiles in SVG and PNG
            format.
          </p>
          <p>
            <TransitionLink
              exit={{
                length: 0.5,
              }}
              entry={{
                length: 0.5,
              }}
              className="underlined-link"
              to="/about"
            >
              Learn more about
            </TransitionLink>{" "}
            this project, check the{" "}
            <TransitionLink
              exit={{
                length: 0.5,
              }}
              entry={{
                length: 0.5,
              }}
              className="underlined-link"
              to="/terms-of-use"
            >
              terms of use
            </TransitionLink>{" "}
            or{" "}
            <TransitionLink
              exit={{
                length: 0.5,
              }}
              entry={{
                length: 0.5,
              }}
              className="underlined-link"
              to="/tartans/a"
            >
              start browsing.
            </TransitionLink>
          </p>
        </header>
      </section>
    </Layout>
  )
}
