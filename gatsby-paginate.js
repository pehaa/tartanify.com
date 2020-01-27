const path = require(`path`)

const createPagination = (array, pageLength) => {
  const result = Array()
  for (let i = 0; i < Math.ceil(array.length / pageLength); i++) {
    result.push(array.slice(i * pageLength, (i + 1) * pageLength))
  }
  return result
}

const createPaginatedPages = ({
  nodes,
  createPage,
  pageLength = 10,
  pageTemplate,
  pathPrefix = ``,
  context = {},
}) => {
  const groups = createPagination(nodes, pageLength)
  const paginationTemplate = path.resolve(pageTemplate)
  groups.forEach((group, index, groups) => {
    return createPage({
      path: index > 0 ? `${pathPrefix}/${index + 1}` : `/${pathPrefix}`,
      component: paginationTemplate,
      context: {
        ...context,
        group,
        pathPrefix,
        first: index === 0,
        last: index === groups.length - 1,
        index: index + 1,
        pageCount: groups.length,
      },
    })
  })
}

module.exports = createPaginatedPages
