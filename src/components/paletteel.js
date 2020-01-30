import React from "react"

const PaletteEl = ({ colors, id }) => {
  // https://css-tricks.com/converting-color-spaces-in-javascript/
  const hue = H => {
    // Convert hex to RGB first
    let r = 0,
      g = 0,
      b = 0
    if (H.length === 4) {
      r = "0x" + H[1] + H[1]
      g = "0x" + H[2] + H[2]
      b = "0x" + H[3] + H[3]
    } else if (H.length === 7) {
      r = "0x" + H[1] + H[2]
      g = "0x" + H[3] + H[4]
      b = "0x" + H[5] + H[6]
    }
    // Then to HSL
    r /= 255
    g /= 255
    b /= 255
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0

    if (delta === 0) h = 0
    else if (cmax === r) h = ((g - b) / delta) % 6
    else if (cmax === g) h = (b - r) / delta + 2
    else h = (r - g) / delta + 4

    h = Math.round(h * 60)

    if (h < 0) h += 360

    return h
  }

  const colorsArray = colors
    .split(" ")
    .map(el => {
      return `#${el.split("#")[1]}`
    })
    .sort((a, b) => hue(a) - hue(b))

  return (
    <ul className="colors">
      {colorsArray.map((el, index) => (
        <li
          key={`${id}-${index}`}
          className="color"
          style={{ background: el }}
        ></li>
      ))}
    </ul>
  )
}

export default PaletteEl
