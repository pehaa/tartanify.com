const SvgDefs = () => {
  const multiplier = 4

  const defs = `<defs><linearGradient id="g" x1="0" x2="100%" y1="0" y2="100%">  
  <stop id="stop0001" offset="0" stop-color="white" stop-opacity="0" />
  <stop id="stop0005" offset="50%" stop-color="white" stop-opacity="0" />
  <stop id="stop0007" offset="50%" stop-color="white" stop-opacity="1" />
  <stop id="stop0008" offset="100%" stop-color="white" stop-opacity="1" />  
</linearGradient>
<linearGradient id="g2" x1="0" x2="100%" y1="0" y2="100%">  
  <stop id="stop0001" offset="0" stop-color="white" stop-opacity="1" />
  <stop id="stop0005" offset="50%" stop-color="white" stop-opacity="1" />
  <stop id="stop0007" offset="50%" stop-color="white" stop-opacity="0" />
  <stop id="stop0008" offset="100%" stop-color="white" stop-opacity="0" />  
</linearGradient>
<pattern id="pattern" x="0" y="0" width="${2 * multiplier}" height="${2 *
    multiplier}" patternUnits="userSpaceOnUse">  
  <rect height="${multiplier}" width="${multiplier}" x="0" y="0" fill="url(#g)" />
  <rect height="${multiplier}" width="${multiplier}" x="0" y="${multiplier}" fill="url(#g2)" />
  <rect height="${multiplier}" width="${multiplier}" x="${multiplier}" y="0" fill="url(#g2)" />
  <rect height="${multiplier}" width="${multiplier}" x="${multiplier}" y="${multiplier}" fill="url(#g)" /> 
</pattern>
<mask id="grating" x="0" y="0" width="1" height="1">  
  <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)"/>  
</mask></defs>`
  return defs
}

export default SvgDefs
