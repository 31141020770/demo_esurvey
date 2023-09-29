import * as React from "react"
import { SVGProps, memo } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={19}
    viewBox="0 0 14 13"
    fill="#5F5F5F"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_2120_20075"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={14}
      height={13}
    >
      <rect width={13.0559} height={13} fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_2120_20075)">
      <path
        d="M4.89592 9.75004C4.59672 9.75004 4.34059 9.64396 4.12753 9.43181C3.91447 9.21966 3.80793 8.96462 3.80793 8.66671V2.16671C3.80793 1.86879 3.91447 1.61376 4.12753 1.4016C4.34059 1.18945 4.59672 1.08337 4.89592 1.08337H9.79187C10.0911 1.08337 10.3472 1.18945 10.5603 1.4016C10.7733 1.61376 10.8799 1.86879 10.8799 2.16671V8.66671C10.8799 8.96462 10.7733 9.21966 10.5603 9.43181C10.3472 9.64396 10.0911 9.75004 9.79187 9.75004H4.89592ZM4.89592 8.66671H9.79187V2.16671H4.89592V8.66671ZM2.71995 11.9167C2.42075 11.9167 2.16462 11.8106 1.95155 11.5985C1.73849 11.3863 1.63196 11.1313 1.63196 10.8334V3.25004H2.71995V10.8334H8.70388V11.9167H2.71995Z"
        fill="#5F5F5F"
      />
    </g>
  </svg>
)
const SVGCopy = memo(SvgComponent)
export default SVGCopy
