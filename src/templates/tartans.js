import React from "react"
import Layout from "../components/layout"
import SvgTile from "../components/svgtile"
import SvgBg from "../components/svgbg"
import MyLink from "../components/mylink"
import PaletteEl from "../components/paletteel"
import TartansNavigation from "../components/tartansnavigation"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

const TartansTemplate = ({ pageContext }) => {
  const {
    group,
    index,
    last,
    pageCount,
    letter,
    previousLetterLastIndex,
  } = pageContext

  const dataBg = useStaticQuery(graphql`
    {
      tartansCsv(fields: { slug: { eq: "corrie" } }) {
        Palette
        Threadcount
      }
    }
  `)
  const svg = SvgTile({
    palette: dataBg.tartansCsv.Palette,
    threadcount: dataBg.tartansCsv.Threadcount,
  })
  return (
    <Layout>
      <SEO
        description={`All Tartans starting by letter ${letter.toUpperCase()} - page ${index +
          1} / ${pageCount}`}
        title={`${letter.toUpperCase()} - page ${index + 1}`}
      ></SEO>
      <SvgBg className="tartans-bg" svg={svg} />
      <TartansNavigation
        className="nav-top"
        letter={letter}
        index={index}
        last={last}
        previousLetterLastIndex={previousLetterLastIndex}
      />
      <section className="etiquette section-all-tartans">
        <header>
          <h1>
            <span className="title-font listing">A-Z Index</span>
            <span className="title-font letter">{letter.toUpperCase()}</span>
            <small>
              {index + 1} / {pageCount}
            </small>
            <span className="discrete">
              <span className="ellipsis">{group[0].fields.Unique_Name}</span>-
              <span className="ellipsis">
                {group[group.length - 1].fields.Unique_Name}
              </span>
            </span>
          </h1>
        </header>
        <ul className="index">
          {group.map(node => {
            return (
              <li className="index-el" key={node.fields.slug}>
                <MyLink to={`/tartan/${node.fields.slug}`}>
                  <span>{node.fields.Unique_Name}</span>
                  {<PaletteEl colors={node.Palette} id={node.id} />}
                </MyLink>
              </li>
            )
          })}
          {group.length < 6 && (
            <>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </>
          )}
        </ul>
        {group.length > 30 && (
          <TartansNavigation
            className="hide-plus"
            letter={letter}
            index={index}
            last={last}
            previousLetterLastIndex={previousLetterLastIndex}
          />
        )}
      </section>
    </Layout>
  )
}

export default TartansTemplate
