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
      <SEO
        description={`All about the Tartanify.com project.`}
        title={`About`}
      ></SEO>
      <SvgBg svg={svg} />
      <section className="etiquette section-all-tartans">
        <header>
          <h1 className="title-font">About this project</h1>
        </header>
        <p>
          According to{" "}
          <a
            className="underlined-link"
            href="https://en.wikipedia.org/wiki/Tartan"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wikipedia,
          </a>{" "}
          tartan is a pattern consisting of criss-crossed horizontal and
          vertical bands in multiple colours. Tartans are particularly
          associated with Scotland since Scottish kilts almost always use them
          as patterns.
        </p>
        <p>
          Both of us, PeHaa and Joe Vains, work a lot with patterns in the
          context of graphic and web design. The idea of creating Tartanify.com
          was born during our summer holidays in Scotland. We were impressed by
          the number and the variety of tartans. They are counted in thousands!
          And each one seems more beautiful than the other.
        </p>
        <section>
          <h2>Technical details</h2>
          <p>
            Tartanify.com is a static site, built with{" "}
            <a
              className="underlined-link"
              href="https://gatsbyjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              gatsby.js.
            </a>{" "}
            It uses a CSV file for the content. The CSV file contains the name
            of the pattern, its color palette, its threadcount and the link to
            the its page in the official registry. This data comes from{" "}
            <a
              className="underlined-link"
              href="https://www.tartanregister.gov.uk/tartanDetails"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="the Scottish Registry of Patterns - opens in a new window"
            >
              the Scottish Registry of Patterns.
            </a>{" "}
          </p>
        </section>
      </section>
    </Layout>
  )
}
