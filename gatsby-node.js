const path = require(`path`)
const slugify = require("./src/utils/slugify")
const tartanTemplate = path.resolve(`./src/templates/tartan.js`)
const tartansTemplate = path.resolve(`./src/templates/tartans.js`)
const letters = "abcdefghijklmnopqrstuvwxyz".split("")
const pageLength = 60

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
      return createPage({
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
const { GraphQLScalarType } = require(`gatsby/graphql`)
const elasticlunr = require(`elasticlunr`)

const SearchIndex = new GraphQLScalarType({
  name: `MySiteSearchIndex_Index`,
  description: `Serialized elasticlunr search index`,

  parseValue() {
    throw new Error(`Not supported`)
  },

  serialize(value) {
    return value
  },

  parseLiteral() {
    throw new Error(`Not supported`)
  },
})

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  createResolvers({
    Query: {
      AllTartansSearchIndex: {
        type: SearchIndex,
        resolve(source, args, context, info) {
          const sitePageNodes = context.nodeModel.getAllNodes({
            type: `TartansCsv`,
          })
          const fieldResolvers = {
            title: node => node.Name,
          }
          return createOrGetIndex(sitePageNodes, cache, fieldResolvers)
        },
      },
    },
  })
}

const createOrGetIndex = async (nodes, cache, fieldResolvers) => {
  const cacheKey = `SitePageSearchIndex`
  const cached = await cache.get(cacheKey)
  if (cached) {
    console.log("from cache")
    return cached
  }
  const index = elasticlunr()
  index.setRef(`id`)
  const fields = Object.keys(fieldResolvers)
  fields.forEach(field => index.addField(field))
  console.log("not from cache")
  for (pageNode of nodes) {
    const doc = {
      id: pageNode.id,
      path: `/tartan/${pageNode.fields.slug}`,
      ...fields.reduce((prev, key) => {
        return {
          ...prev,
          [key]: fieldResolvers[key](pageNode),
        }
      }, {}),
    }
    index.addDoc(doc)
  }

  const json = index.toJSON()
  await cache.set(cacheKey, json)
  return json
}
