const countPattern = (threadcount, palette) => {
  const paletteColors = palette.split(" ").reduce((acc, curr) => {
    const el = curr.split("#")
    acc[el[0].trim()] = `#${[el[1]]}`
    return acc
  }, {})

  const array = threadcount.split(" ")
  let result = []
  let total = 0
  const colCountArray = array.map((el, index) => {
    const regex = /([a-zA-Z]+|\(.*?\))(\/?)(\d+)/gm
    const m = regex.exec(el)
    if (m !== null) {
      total += index === 0 || index === array.length - 1 ? 1 * m[3] : 2 * m[3]
      return { fill: paletteColors[m[1]], size: 4 * m[3] }
    }
    return { fill: "#000000", size: 0 }
  })
  if (array[0].indexOf("/") > -1) {
    for (let i = 0; i < 2 * array.length - 2; i++) {
      const index = i < array.length - 1 ? i : 2 * array.length - 2 - i
      result.push(colCountArray[index])
    }
    if (total % 2) {
      for (let i = 0; i < 2 * array.length - 2; i++) {
        result.push(result[i])
      }
    }
  } else {
    for (let i = 0; i < array.length; i++) {
      const index = i
      result.push(colCountArray[index])
    }
    if (total % 2) {
      for (let i = 0; i < array.length - 1; i++) {
        result.push(result[i])
      }
    }
  }
  return result
}

export default countPattern
