import React from "react"
import Helmet from "react-helmet"
import useSiteMetadata from "../hooks/user-sitemetadata"

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
      <meta name="description" content={seo.description} />
      <meta property="og:url" content="https://tartanify.com" />
      <meta property="og:title" content={site.title} />
      <meta property="og:description" content={site.description} />
      <meta
        property="og:image"
        content="https://tartanify.com/twitter-preview.jpg"
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@pehaa" />
      <meta name="twitter:title" content={site.title} />
      <meta name="twitter:description" content={site.description} />
      <meta name="twitter:image" content="https://tartanify.com/favicon.png" />
    </Helmet>
  )
}

export default SEO
