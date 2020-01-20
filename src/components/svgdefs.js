const SvgDefs = () => `<defs>
  <pattern id="pattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
    <polygon points="0,4 0,8 8,0 4,0" fill="#ffffff"/>
    <polygon points="4,8 8,8 8,4" fill="#ffffff"/>
  </pattern>
  <mask id="grating" x="0" y="0" width="1" height="1">
    <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)"/>
    </mask>
  </defs>`

export default SvgDefs
