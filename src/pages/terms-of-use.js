import React from "react"
import Layout from "../components/layout.js"
import SvgRaw from "../components/svgraw.js"
import SvgBg from "../components/svgbg.js"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const dataBg = useStaticQuery(graphql`
    {
      tartansCsv(fields: { slugg: { eq: "lebrun" } }) {
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
        description={`Copyright and Restrictions.`}
        title={`Licence  information`}
      ></SEO>
      <SvgBg svg={svg} />
      <section className="etiquette section-page">
        <header>
          <h1 className="title-font">
            <span className="letter">Terms of Use</span>
          </h1>
        </header>
        <p>
          On Tartanify.com you will find SVG and PNG pattern tiles generated
          from their "threadcount" and color parameters. The data we used comes
          from{" "}
          <a
            className="underlined-link"
            href="https://www.tartanregister.gov.uk/index"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="the Scottish Register of Tartans - opens in a new window"
          >
            the Scottish Register of Tartans.
          </a>
        </p>
        <p>
          Some of the older tartans are now in the public domain, which means
          that they are not protected by intellectual property laws such as
          copyright.
        </p>
        <p>
          Still, you should keep in mind that many others have legally-binding
          copyright restrictions on weaving or other usages due to commercial or
          other interests.
        </p>

        <p>
          That's why, for each pattern, we provide a link to its page in{" "}
          <a
            className="underlined-link"
            href="https://www.tartanregister.gov.uk/index"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="the Scottish Register of Tartans - opens in a new window"
          >
            the Scottish Register of Tartans.
          </a>{" "}
          Following that link, you will find some details concerning each
          tartan, in particular, the possible restrictions of use.
        </p>
      </section>
    </Layout>
  )
}
