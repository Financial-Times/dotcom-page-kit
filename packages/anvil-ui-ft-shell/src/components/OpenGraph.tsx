import React from 'react'
import flattenOpenGraphData, { TOpenGraphData } from '../lib/flattenOpenGraphData'

export type TOpenGraphProps = {
  openGraph: TOpenGraphData
}

function OpenGraph({ openGraph }: TOpenGraphProps) {
  return (
    <React.Fragment>
      {flattenOpenGraphData(openGraph).map(([property, content], i) => (
        <meta key={`og-${i}`} property={property} content={content} />
      ))}
    </React.Fragment>
  )
}

export default OpenGraph
