import React from "react"
import { Helmet } from "react-helmet"
import useSiteMetadata from "../hooks/usesitemetadata"
import favicon16 from "../assets/favicon-16x16.png"
import favicon32 from "../assets/favicon-32x32.png"
import faviconappletouch from "../assets/apple-touch-icon.png"

const SEO = ({ title, description, lang = "en" }) => {
  const site = useSiteMetadata()
  const seo = {
    title: title || site.title,
    description: description || site.description,
  }
  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={seo.title}
      titleTemplate={`%s | ${site.title}`}
    >
      <link rel="apple-touch-icon" sizes="180x180" href={faviconappletouch} />
      <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
      <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
      <link rel="manifest" href="https://tartanify.com/site.webmanifest" />
      <meta name="description" content={seo.description} />
      <meta property="og:url" content="https://tartanify.com" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://tartanify.com/twitter-preview.jpg"
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@pehaa" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://tartanify.com/favicon.png" />
    </Helmet>
  )
}

export default SEO
