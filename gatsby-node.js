const path = require(`path`)
const createPaginatedPages = require("gatsby-paginate")

const slugify = string => {
  const a =
    "àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;"
  const b =
    "aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------"
  const p = new RegExp(a.split("").join("|"), "g")

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
}
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const tartanPost = path.resolve(`./src/templates/tartan.js`)
  const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "y",
  ]
  let allResults = {}
  for (var i = 0; i < letters.length; i++) {
    const el = letters[i]
    const allResults = await graphql(`
      query {
        allTartansCsv(limit: -1, filter: {Name: {regex: "/^${el}/i"}}) {
          edges {
            node {
              Name
              id
              Palette
              Threadcount
              fields {
                slugg
                Uniquename
              }
            }
          }
          totalCount
        }
      }
    `)

    if (allResults.errors) {
      throw allResults.errors
    }

    const tartans = allResults.data.allTartansCsv.edges

    createPaginatedPages({
      edges: tartans,
      createPage: createPage,
      pageTemplate: "src/templates/tartans.js",
      pageLength: 60,
      pathPrefix: `tartans/${el}`,
      context: {
        letter: el,
        previousletter: i > 0 ? letters[i - 1] : "",
        nextletter: i < letters.length - 1 ? letters[i + 1] : "",
        all: tartans,
      },
      buildPath: (index, pathPrefix) =>
        index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}`, // This is optional and this is the default
    })
  }

  const allResultsAtOnce = await graphql(`
    query {
      allTartansCsv(limit: -1) {
        edges {
          node {
            Name
            id
            Palette
            Threadcount
            fields {
              slugg
              Uniquename
            }
          }
        }
        totalCount
      }
    }
  `)

  if (allResultsAtOnce.errors) {
    throw allResultsAtOnce.errors
  }

  const tartansAtOnce = allResultsAtOnce.data.allTartansCsv.edges
  tartansAtOnce.forEach((post, index) => {
    const next =
      index === tartansAtOnce.length - 1 ? null : tartansAtOnce[index + 1].node
    const previous = index === 0 ? null : tartansAtOnce[index - 1].node

    createPage({
      path: `/tartan/${post.node.fields.slugg}`,
      component: tartanPost,
      context: {
        id: post.node.id,
        slugg: post.node.fields.slugg,
        previous,
        next,
      },
    })
  })
}
let slugs = []
let i = 1
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `TartansCsv`) {
    let value = slugify(node.Name)
    let nameValue = node.Name
    if (slugs.indexOf(value) !== -1) {
      value += `-${i}`
      nameValue += ` ${i}`
      i++
    } else {
      i = 1
    }
    slugs.push(value)
    createNodeField({
      name: `slugg`,
      node,
      value,
    })
    createNodeField({
      name: `Uniquename`,
      node,
      value: nameValue,
    })
  }
}
