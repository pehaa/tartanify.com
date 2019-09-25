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
        description={`Copyright and Restrictions.`}
        title={`Licence  information`}
      ></SEO>
      <SvgBg
        palette={dataBg.tartansCsv.Palette}
        threadcount={dataBg.tartansCsv.Threadcount}
        name={dataBg.tartansCsv.slugg}
      />
      <section className="etiquette section-all-tartans">
        <header>
          <h1 class="title-font">License Information</h1>
        </header>
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
          Tartanify.com provides SVG and PNG pattern tiles generated from the
          threadcount and color parameters of the particular patterns.
        </p>
        <p>
          You can find more information concerning the restriction of particular
          patterns in{" "}
          <a
            class="underlined-link"
            href="https://www.tartanregister.gov.uk/tartanDetails"
          >
            tartanregister.gov.uk
          </a>
        </p>
      </section>
    </Layout>
  )
}
