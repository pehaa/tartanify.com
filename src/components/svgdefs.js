const SvgDefs = () => {
  const multiplier = 4

  const defs = `<defs>
<pattern id="pattern" x="0" y="0" width="${2 * multiplier}" height="${2 *
    multiplier}" patternUnits="userSpaceOnUse"><polygon points="0,${multiplier} 0,${2 *
    multiplier} ${2 *
    multiplier},0 ${multiplier},0" fill="#ffffff"/><polygon points="${multiplier},${2 *
    multiplier} ${2 * multiplier},${2 * multiplier} ${2 *
    multiplier},${multiplier}" fill="#ffffff"/></pattern><mask id="grating" x="0" y="0" width="1" height="1">  
  <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)"/></mask></defs>`
  return defs
}

export default SvgDefs
