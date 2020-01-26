import ReactDOMServer from "react-dom/server"

const svgAsString = svg => {
  return encodeURIComponent(ReactDOMServer.renderToStaticMarkup(svg))
}

export default svgAsString
