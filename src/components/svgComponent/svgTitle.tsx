import * as React from "react"
import { SVGProps, memo } from "react"
const SvgTitleC = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={28}
    height={32}
    viewBox="0 0 17 18"
    fill="#5F5F5F"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_2299_5605"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={17}
      height={18}
    >
      <rect y={0.351562} width={17} height={17} fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_2299_5605)">
      <path
        d="M9.91675 14.5182V5.30988H6.37508V3.18488H15.5834V5.30988H12.0417V14.5182H9.91675ZM3.54175 14.5182V8.85154H1.41675V6.72654H7.79175V8.85154H5.66675V14.5182H3.54175Z"
        fill="#5F5F5F"
      />
    </g>
  </svg>
)
const SvgTitle = memo(SvgTitleC)
export default SvgTitle