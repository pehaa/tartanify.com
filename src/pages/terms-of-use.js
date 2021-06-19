import React from "react"
import Layout from "../components/layout"
import SvgTile from "../components/svgtile"
import SvgBg from "../components/svgbg"
import Seo from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

const TermsOfUse = () => {
  const dataBg = useStaticQuery(graphql`
    {
      tartansCsv(fields: { slug: { eq: "lebrun" } }) {
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
      <Seo
        description={`Copyright and Restrictions.`}
        title={`Licence  information`}
      ></Seo>
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

export default TermsOfUse