import SvgDefs from "./svgdefs.js"
const standards = {
  B: "#0000cd",
  DB: "#000080",
  R: "red",
  G: "#228b22",
  Y: "#fee600",
  BK: "#101010",
  K: "#101010",
  W: "white",
  AZ: "#87ceeb",
  BR: "#a52a2a",
  CR: "#b22222",
  GY: "#666666",
  N: "#666666",
  T: "#603311",
  LG: "#98fb98",
  PU: "#dda0dd",
  Lil: "#da70d6",
  Lv: "#e6e6fa",
  Ma: "#ff00ff",
  Mn: "#b03060",
  Or: "#ffa500",
  Cy: "#00ffff",
  Cor: "#ff7f50",
  SlB: "#6a5acd",
  Mar: "#b03060",
  Trq: "#40e0d0",
  Glr: "#daa520",
  Wh: "#f5deb3",
}
const countPattern = (threadcount, palette) => {
  const paletteColors = {
    ...standards,
    ...palette.split(" ").reduce((acc, curr) => {
      const el = curr.split("#")
      acc[el[0].trim()] = `#${[el[1]]}`
      return acc
    }, {}),
  }

  const array = threadcount.split(" ")
  let result = []
  let total = 0
  const colCountArray = array.map((el, index) => {
    const regex = /([a-zA-Z]+|\(.*?\))(\/?)(\d+)/gm
    const m = regex.exec(el)
    total += index === 0 || index === array.length - 1 ? 1 * m[3] : 2 * m[3]
    return { fill: paletteColors[m[1]], size: 4 * m[3] }
  })
  for (var i = 0; i < 2 * array.length - 2; i++) {
    const index = i < array.length - 1 ? i : 2 * array.length - 2 - i
    result.push(colCountArray[index])
  }
  if (total % 2) {
    for (var i = 0; i < 2 * array.length - 2; i++) {
      result.push(result[i])
    }
  }
  return result
}
const SvgRaw = props => {
  const { palette, threadcount } = props
  const tartanCount = countPattern(threadcount, palette)

  let position = 0
  var positions = [0]
  for (var i = 1; i < tartanCount.length + 1; i++) {
    position += tartanCount[i - 1].size
    positions.push(position)
  }
  const size = positions[positions.length - 1]
  let svg = `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" x="0"  y="0" xmlns="http://www.w3.org/2000/svg">${SvgDefs()}<g id="horizStripes">`

  tartanCount.map((el, index) => {
    svg += `<rect fill="${el.fill}" height="${el.size}" width="100%" x="0" y="${positions[index]}"/>`
  })
  svg += `</g><g id="vertStripes" mask="url(#grating)">`
  tartanCount.map((el, index) => {
    svg += `<rect fill="${el.fill}" width="${el.size}" height="100%" y="0" x="${positions[index]}"/>`
  })
  svg += `</g></svg>`
  return { svg: svg, size: size }
}

export default SvgRaw
