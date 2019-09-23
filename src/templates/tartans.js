import React from "react"
import Layout from "../components/layout"
import SvgBg from "../components/svgbg"
import { Link } from "gatsby"
import TransitionLink from "gatsby-plugin-transition-link"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

const PaletteEl = ({ colors, id }) => {
  const colorsArray = colors.split(" ").map(el => {
    return `#${el.split("#")[1]}`
  })
  return (
    <ul className="colors">
      {colorsArray.sort().map((el, index) => (
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
  } = pageContext
  const previousUrl = first
    ? `/tartans/${previousletter}`
    : index - 1 === 1
    ? `/${pathPrefix}`
    : `/${pathPrefix}/${(index - 1).toString()}`
  const nextUrl = last
    ? `/tartans/${nextletter}`
    : `/${pathPrefix}/${(index + 1).toString()}`
  const dataBg = useStaticQuery(graphql`
    {
      tartansCsv(fields: { slugg: { eq: "scottish-scouts" } }) {
        Palette
        Threadcount
        Name
      }
    }
  `)
  console.log(group)
  return (
    <Layout>
      <SEO
        description={`All Tartans starting by letter ${letter.toUpperCase()} - page ${index} / ${pageCount}`}
        title={`${letter.toUpperCase()} - page ${index}`}
      ></SEO>
      <SvgBg
        className={`tartans-bg`}
        style={{ opacity: 1 }}
        palette={dataBg.tartansCsv.Palette}
        threadcount={dataBg.tartansCsv.Threadcount}
        name={dataBg.tartansCsv.slugg}
      />

      <nav className="nav-top">
        <div className="previousLink">
          {(!first || previousletter) && (
            <TransitionLink
              exit={{
                length: 0.5,
              }}
              entry={{
                length: 0.5,
              }}
              to={previousUrl}
              aria-label="Go to Previous Page"
            >
              <span className="icon">&lsaquo;</span>
            </TransitionLink>
          )}
        </div>
        <div className="nextLink">
          {(!last || nextletter) && (
            <TransitionLink
              exit={{
                length: 0.5,
              }}
              entry={{
                length: 0.5,
              }}
              to={nextUrl}
              aria-label="Go to Next Page "
            >
              <span className="icon">&rsaquo;</span>
            </TransitionLink>
          )}
        </div>
      </nav>
      <section className="etiquette section-all-tartans">
        <header>
          <h1>
            <span className="title-font listing">Listing</span>
            <span className="title-font letter">{letter.toUpperCase()}</span>
            <small>
              {index} / {pageCount}
            </small>
          </h1>
        </header>
        <ul className="index">
          {group.map(({ node }) => {
            return (
              <li className="index-el" key={node.id}>
                <TransitionLink
                  exit={{
                    length: 0.5,
                  }}
                  entry={{
                    delay: 0,
                    length: 0.5,
                  }}
                  to={`/tartan/${node.fields.slugg}`}
                >
                  <span>{node.fields.Uniquename}</span>
                  {<PaletteEl colors={node.Palette} id={node.id} />}
                </TransitionLink>
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
      </section>
    </Layout>
  )
}

export default TartansListing
