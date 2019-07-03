import React from 'react'
import flattenOpenGraphData, { TOpenGraphData } from '../lib/flattenOpenGraphData'

export type TOpenGraphProps = {
  openGraph?: TOpenGraphData
}

const OpenGraph = ({ openGraph }: TOpenGraphProps) => (
  <React.Fragment>
    {flattenOpenGraphData(openGraph).map(([property, content], i) => (
      <meta key={`og-${i}`} property={property} content={content} />
    ))}
  </React.Fragment>
)

OpenGraph.defaultProps = {
  openGraph: {}
}

export default OpenGraph
