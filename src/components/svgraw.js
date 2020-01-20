import svgDefs from "./svgdefs.js"

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
const SvgRaw = props => {
  const { palette, threadcount } = props
  const tartanCount = countPattern(threadcount, palette)

  const cumulativeSum = (sum => value => (sum += value))(0)
  const cumSizes = tartanCount.map(el => el.size).map(cumulativeSum)

  const size = cumSizes[cumSizes.length - 1]

  console.log(tartanCount)

  let svg = `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" x="0"  y="0" xmlns="http://www.w3.org/2000/svg">
    ${svgDefs()}
    <g id="horizStripes">`
  tartanCount.forEach(({ fill, size }, index) => {
    svg += `<rect fill="${fill}" height="${size}" width="100%" x="0" y="${
      cumSizes[index - 1]
    }"/>`
  })
  svg += `</g><g id="vertStripes" mask="url(#grating)">`
  tartanCount.forEach(({ fill, size }, index) => {
    svg += `<rect fill="${fill}" width="${size}" height="100%" y="0" x="${
      cumSizes[index - 1]
    }"/>`
  })
  svg += `</g></svg>`
  return { svg: svg, size: size }
}

export default SvgRaw
