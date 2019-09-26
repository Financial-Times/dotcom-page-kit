import React from 'react'

export type TTitleProps = {
  pageTitle?: string
  siteTitle?: string
}

export const Title = (props: TTitleProps) => (
  <title>{props.pageTitle ? `${props.pageTitle} | ${props.siteTitle}` : props.siteTitle}</title>
)

Title.defaultProps = {
  siteTitle: 'Financial Times'
}

export default Title
