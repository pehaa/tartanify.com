import React from "react"
import Layout from "../components/layout"
import SvgTile from "../components/svgtile.js"
import SvgBg from "../components/svgbg.js"
import MyLink from "../components/mylink"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

const PaletteEl = ({ colors, id }) => {
  const colorsArray = colors.split(" ").map(el => {
    return `#${el.split("#")[1]}`
  })
  return (
    <ul className="colors">
      {colorsArray.map((el, index) => (
        <li
          key={`${id}-${index}`}
          className="color"
          style={{ background: el }}
        ></li>
      ))}
    </ul>
  )
}
const TartansListing = ({ pageContext }) => {
  const {
    group,
    index,
    first,
    last,
    pathPrefix,
    pageCount,
    letter,
    previousletter,
    nextletter,
    previousletterlast,
  } = pageContext
  const previousUrl = first
    ? previousletterlast === 1
      ? `/tartans/${previousletter}`
      : `/tartans/${previousletter}/${previousletterlast}`
    : index - 1 === 1
    ? `/${pathPrefix}`
    : `/${pathPrefix}/${(index - 1).toString()}`
  const nextUrl = last
    ? `/tartans/${nextletter}`
    : `/${pathPrefix}/${(index + 1).toString()}`

  const dataBg = useStaticQuery(graphql`
    {
      tartansCsv(fields: { slugg: { eq: "corrie" } }) {
        Palette
        Threadcount
        Name
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
        description={`All Tartans starting by letter ${letter.toUpperCase()} - page ${index} / ${pageCount}`}
        title={`${letter.toUpperCase()} - page ${index}`}
      ></SEO>
      <SvgBg className={`tartans-bg`} svg={svg} />
      <nav className="nav-top nav">
        <div className="previousLink">
          {(!first || previousletter) && (
            <MyLink to={previousUrl} aria-label="Go to Previous Page">
              <span className="icon">&lsaquo;</span>
            </MyLink>
          )}
        </div>
        <div className="nextLink">
          {(!last || nextletter) && (
            <MyLink to={nextUrl} aria-label="Go to Next Page ">
              <span className="icon">&rsaquo;</span>
            </MyLink>
          )}
        </div>
      </nav>
      <section className="etiquette section-all-tartans">
        <header>
          <h1>
            <span className="title-font listing">A-Z Index</span>
            <span className="title-font letter">{letter.toUpperCase()}</span>
            <small>
              {index} / {pageCount}
            </small>
            <span className="discrete">
              <span className="ellipsis">{group[0].node.Name}</span>-
              <span className="ellipsis">
                {group[group.length - 1].node.Name}
              </span>
            </span>
          </h1>
        </header>
        <ul className="index">
          {group.map(({ node }) => {
            return (
              <li className="index-el" key={node.id}>
                <MyLink to={`/tartan/${node.fields.slugg}`}>
                  <span>{node.fields.Uniquename}</span>
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
          <nav className="hide-plus nav">
            <div className="previousLink">
              {(!first || previousletter) && (
                <MyLink to={previousUrl} aria-label="Go to Previous Page">
                  <span className="icon">&lsaquo;</span>
                </MyLink>
              )}
            </div>
            <div className="nextLink">
              {(!last || nextletter) && (
                <MyLink to={nextUrl} aria-label="Go to Next Page ">
                  <span className="icon">&rsaquo;</span>
                </MyLink>
              )}
            </div>
          </nav>
        )}
      </section>
    </Layout>
  )
}

export default TartansListing
