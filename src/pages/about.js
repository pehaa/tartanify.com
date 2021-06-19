import React from "react"
import Layout from "../components/layout"
import SvgTile from "../components/svgtile"
import SvgBg from "../components/svgbg"
import Seo from "../components/seo"
import twitter from "../assets/icons-social-twitter.svg"
import dribbble from "../assets/icons-social-dribble.svg"
import codepen from "../assets/icons-social-codepen.svg"
import { useStaticQuery, graphql } from "gatsby"

const About = () => {
  const dataBg = useStaticQuery(graphql`
    {
      tartansCsv(fields: { slug: { eq: "argentina" } }) {
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
        description={`All about the Tartanify.com project.`}
        title={`About`}
      ></Seo>
      <SvgBg svg={svg} />
      <section className="etiquette section-page section-about">
        <header>
          <h1 className="title-font">
            <span className="letter">About</span>
          </h1>
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
          tartan is a pattern consisting of crisscrossed horizontal and vertical
          bands in multiple colors. Tartans are particularly associated with
          Scotland since Scottish kilts almost always use them as patterns.
        </p>
        <p>
          Both of us, PeHaa and Joe Vains, work a lot with patterns in the
          context of graphic and web design. The idea of creating Tartanify.com
          was born during our summer holidays in Scotland. We were impressed by
          the number and the variety of tartans. They are counted in thousands!
          And each one seems more beautiful than the other.
        </p>
        <section>
          <h2 className="title-font">Technical details</h2>
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
            of each pattern, its color palette, its "threadcount" and the link
            to its page in the official register. This data comes from{" "}
            <a
              className="underlined-link"
              href="https://www.tartanregister.gov.uk/index"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="the Scottish Register of Tartans - opens in a new window"
            >
              the Scottish Register of Tartans.
            </a>{" "}
          </p>
        </section>
        <section>
          <h2 className="title-font">About Us</h2>
          <p>
            PeHaa and Joe Vains are a Polish/French couple living in Paris. They
            share a passion for web design and love working together on side
            projects.
          </p>
          <div className="grid-about">
            <section>
              <header>
                <div className="title-social-icons">
                  <h3>Joe Vains</h3>
                  <a
                    href="https://twitter.com/joevains"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={twitter}
                      alt="Follow Joe Vains on Twitter - opens in a new window"
                    ></img>
                  </a>
                  <a
                    href="https://dribbble.com/joevains"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={dribbble}
                      alt="Follow Joe Vains on Dribbble - opens in a new window"
                    ></img>
                  </a>
                </div>
                <p className="role">Web designer</p>
              </header>
              <p className="description">
                Joe Vains, aka Sylvain Guizard, was the designer and the
                originator of the tartanify project.
              </p>
            </section>
            <section>
              <header>
                <div className="title-social-icons">
                  <h3>PeHaa</h3>
                  <a
                    href="https://twitter.com/pehaa"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={twitter}
                      alt="Follow PeHaa on Twitter - opens in a new window"
                    ></img>
                  </a>
                  <a
                    href="https://codepen.io/pehaa"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={codepen}
                      alt="Follow PeHaa on Codepen - opens in a new window"
                    ></img>
                  </a>
                </div>
                <p className="role">Front-end Developer</p>
              </header>
              <p className="description">
                PeHaa, aka Paulina Hetman, is a front-end developer, web
                designer, and trainer. You can learn more about her work on{" "}
                <a
                  className="underlined-link"
                  href="https://pehaa.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  pehaa.com.
                </a>
              </p>
            </section>
          </div>
        </section>
      </section>
    </Layout>
  )
}

export default About