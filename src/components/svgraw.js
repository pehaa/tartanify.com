import SvgDefs from "./svgdefs.js"
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
    console.log(el)
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

  let position = 0
  let positions = [0]
  for (let i = 1; i < tartanCount.length + 1; i++) {
    position += tartanCount[i - 1].size
    positions.push(position)
  }
  const size = positions[positions.length - 1]
  let svg = `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" x="0"  y="0" xmlns="http://www.w3.org/2000/svg">${SvgDefs()}<g id="horizStripes">`

  for (let i = 0; i < tartanCount.length; i++) {
    svg += `<rect fill="${tartanCount[i].fill}" height="${tartanCount[i].size}" width="100%" x="0" y="${positions[i]}"/>`
  }
  svg += `</g><g id="vertStripes" mask="url(#grating)">`
  for (let i = 0; i < tartanCount.length; i++) {
    svg += `<rect fill="${tartanCount[i].fill}" width="${tartanCount[i].size}" height="100%" y="0" x="${positions[i]}"/>`
  }
  svg += `</g></svg>`
  return { svg: svg, size: size }
}

export default SvgRaw
