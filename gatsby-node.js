const path = require(`path`)
const slugify = require("./src/utils/slugify")
const tartanTemplate = path.resolve(`./src/templates/tartan.js`)
const tartansTemplate = path.resolve(`./src/templates/tartans.js`)
const letters = "abcdefghijklmnopqrstuvwxyz".split("")
const pageLength = 60
const { GraphQLJSONObject } = require("graphql-type-json")
const lunr = require(`lunr`)

const paginateNodes = (array, pageLength) => {
  const result = Array()
  for (let i = 0; i < Math.ceil(array.length / pageLength); i++) {
    result.push(array.slice(i * pageLength, (i + 1) * pageLength))
  }
  return result
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const allTartans = await graphql(`
    query {
      allTartansCsv {
        edges {
          node {
            id
            fields {
              slug
            }
          }
          previous {
            fields {
              slug
              Unique_Name
            }
          }
          next {
            fields {
              slug
              Unique_Name
            }
          }
        }
      }
    }
  `)

  if (allTartans.errors) {
    throw allTartans.errors
  }

  allTartans.data.allTartansCsv.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: `/tartan/${node.fields.slug}`,
      component: tartanTemplate,
      context: {
        id: node.id,
        previous,
        next,
      },
    })
  })

  let previousLetterLastIndex = 1
  for (const letter of letters) {
    const allTartansByLetter = await graphql(`
      query {
        allTartansCsv(filter: {Name: {regex: "/^${letter}/i"}}) {
          nodes {
            Palette
            fields {
              slug
              Unique_Name
            }
          }
          totalCount
        }
      }
    `)

    if (allTartansByLetter.errors) {
      throw allTartansByLetter.errors
    }
    const nodes = allTartansByLetter.data.allTartansCsv.nodes
    const totalCountByLetter = allTartansByLetter.data.allTartansCsv.totalCount
    const paginatedNodes = paginateNodes(nodes, pageLength)

    paginatedNodes.forEach((group, index, groups) => {
      createPage({
        path:
          index > 0 ? `/tartans/${letter}/${index + 1}` : `/tartans/${letter}`,
        component: tartansTemplate,
        context: {
          group,
          index,
          last: index === groups.length - 1,
          pageCount: groups.length,
          letter,
          previousLetterLastIndex,
        },
      })
    })
    previousLetterLastIndex = Math.ceil(totalCountByLetter / pageLength)
  }
}

// we will store slugs here and use this array to check if a new one already exists
let slugs = []
// we add numbers create unique slugs and names
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `TartansCsv`) {
    let slug = slugify(node.Name)
    let uniqueName = node.Name
    if (slugs.indexOf(slug) !== -1) {
      slug += `-${i}`
      uniqueName += ` ${i}`
      i++
    } else {
      i = 1
    }

    slugs.push(slug)

    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })
    createNodeField({
      name: `Unique_Name`,
      node,
      value: uniqueName,
    })
  }
}

exports.createResolvers = ({ cache, createResolvers }) => {
  createResolvers({
    Query: {
      AllSearchIndexLunr: {
        type: GraphQLJSONObject,
        resolve(source, args, context) {
          const siteNodes = context.nodeModel.getAllNodes({
            type: `TartansCsv`,
          })
          return createIndex(siteNodes, cache)
        },
      },
    },
  })
}

const createIndex = async (nodes, cache) => {
  const cacheKey = `SiteSearchIndexLunr`
  const cached = await cache.get(cacheKey)
  if (cached) {
    return cached
  }
  const store = {}
  const index = lunr(function() {
    this.ref(`slug`)
    this.field(`title`)
    for (node of nodes) {
      const { slug } = node.fields
      const doc = {
        slug,
        title: node.fields.Unique_Name,
      }
      store[slug] = {
        title: doc.title,
      }
      this.add(doc)
    }
  })

  const json = { index: index.toJSON(), store }
  cache.set(cacheKey, json)
  return json
}
