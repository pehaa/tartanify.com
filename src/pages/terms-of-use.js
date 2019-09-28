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
      <section className="etiquette section-all-tartans">
        <header>
          <h1 className="title-font">Terms of Use</h1>
        </header>
        <p>
          On Tartanify.com you will find SVG and PNG pattern tiles generated
          from the threadcount and color parameters. The data we used comes from
          The national repository of tartans.
        </p>
        <p>
          Some of the older tartans are now in the public domain which means
          that they are not protected by intellectual property laws such as
          copyright.
        </p>
        <p>
          Still, you should keep in mind that many others have legally-binding
          copyright restrictions on weaving or other usage due to commercial or
          other interests.
        </p>

        <p>
          That's why, for each pattern, we provide a link to its page in{" "}
          <a
            class="underlined-link"
            href="https://www.tartanregister.gov.uk/tartanDetails"
          >
            the Scottish Registry of Patterns.
          </a>{" "}
          Following that link, you will find some details concerning each
          tartan, in particular the possible restrictions of use.
        </p>
      </section>
    </Layout>
  )
}
