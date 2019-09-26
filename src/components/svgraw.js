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
// B#2C2C80 BLUE; GO#BC8C00 DARK GOLD; DG#003820 DARK GREEN; LG#289C18 LIGHT GREEN; R#C80000 RED; DT#441800 DARK BROWN; G#006818 GREEN; K#101010 BLACK; LY#C4BC68 LGT YELLOW; W#E0E0E0 WHITE; T#604000 BROWN; BG#009894 TEAL;,LY50 GO16 LY8 T8 GO1 T1 GO1 T1 GO1 T1 GO1 T1 GO1 T1 GO1 T1 GO20 T40 LY12 T24 DG8 GO1 DG1 GO1 DG1 GO1 DG1 GO1 DG1 GO1 DG1 GO1 DG1 GO28 DG6 T4 // LY50 T4 DG4 T4 DG4 T4 DG4 T4 DG4 T4 GO28 LY4 T4 DG20 LY8 T2 LY6 T2 LY6 T8 DG8 GO16,,Not Specified,7712,,,"In his thorough and painstaking 2008 review of Canadian tartans, John Fitzpatrick pointed out that a series of ten tartans from Pik Mills of Quebec City were probably their contribution to the 'Centennial of Confederation' like the 'Fathers of Confederation' series produced by WCWM/Sainthill-Levine. All ten tartans are complex asymmetric designs each with different warp and weft. The threadcounts (taken from the CIDD) remain the same but colours are changed.",Not Specified,,This tartan was recorded prior to the launch of The Scottish Register of Tartans.,,https://www.tartanregister.gov.uk/tartanDetails.aspx?ref=5704

const countPattern = (threadcount, palette) => {
  const colorsAr = palette.split(";")
  colorsAr.pop()
  const paletteColors = {
    ...standards,
    ...colorsAr.reduce((acc, curr) => {
      const el = curr.split("#")
      const colorCode = el[1].split(" ")
      acc[el[0].trim()] = `#${colorCode[0]}`
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
