import React from "react"
import SvgDefs from "./svgdefs"
import countPattern from "./svgcount"

const SvgTile = props => {
  const { palette, threadcount } = props
  const tartanCount = countPattern(threadcount, palette)

  const cumulativeSum = (sum => value => (sum += value))(0)
  const cumulativeSizes = tartanCount.map(el => el.size).map(cumulativeSum)

  const size = cumulativeSizes[cumulativeSizes.length - 1]

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      x="0"
      y="0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <SvgDefs />
      <g id="horizStripes">
        {tartanCount.map((el, index) => {
          return (
            <rect
              key="index"
              fill={el.fill}
              height={el.size}
              width="100%"
              x="0"
              y={cumulativeSizes[index - 1] || 0}
            />
          )
        })}
      </g>
      <g id="vertStripes" mask="url(#grating)">
        {tartanCount.map((el, index) => {
          return (
            <rect
              key="index"
              fill={el.fill}
              height="100%"
              width={el.size}
              x={cumulativeSizes[index - 1] || 0}
              y="0"
            />
          )
        })}
      </g>
    </svg>
  )
}

export default SvgTile
