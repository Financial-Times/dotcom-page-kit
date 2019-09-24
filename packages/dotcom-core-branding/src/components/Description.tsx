import React from 'react'

export type TDescriptionProps = {
  description?: string
}

export const Description = (props: TDescriptionProps) =>
  props.description ? <meta name="description" content={props.description} /> : null

Description.defaultProps = {
  description:
    'News, analysis and comment from the Financial Times, the worldʼs leading global business publication'
}

export default Description
