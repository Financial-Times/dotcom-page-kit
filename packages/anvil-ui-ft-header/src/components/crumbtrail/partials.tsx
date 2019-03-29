import React from 'react'
import { THeaderProps } from '../../interfaces'

const IncludeCrumbtrail = (props: THeaderProps) => {
  return props.showSubNav ? (
    <Crumbtrail>
      <BreadCrumb breadcrumb={props.data.breadcrumb} />
      <SubSections subsections={props.data.subsections} />
    </Crumbtrail>
  ) : null
}

const Crumbtrail = (props) => (
  <div
    className="o-header__subnav"
    role="navigation"
    aria-label="Sub navigation"
    data-o-header-subnav
    data-trackable="header-subnav">
    <div className="o-header__container">
      <div className="o-header__subnav-wrap-outside">
        <div className="o-header__subnav-wrap-inside" data-o-header-subnav-wrapper>
          <div className="o-header__subnav-content">{props.children}</div>
        </div>
        {/* Implements crumbtrail scrolling at smaller viewports */}
        <button
          className="o-header__subnav-button o-header__subnav-button--left"
          title="scroll left"
          aria-label="scroll left"
          aria-hidden="true"
          disabled
        />
        <button
          className="o-header__subnav-button o-header__subnav-button--right"
          title="scroll right"
          aria-label="scroll right"
          aria-hidden="true"
          disabled
        />
      </div>
    </div>
  </div>
)

const BreadCrumb = ({ breadcrumb }) => {
  return (
    <ol
      className="o-header__subnav-list o-header__subnav-list--breadcrumb"
      aria-label="Breadcrumb"
      data-trackable="breadcrumb">
      {breadcrumb.map((item, index) => {
        const selected = item.selected ? 'o-header__subnav-link--highlight' : null
        const ariaCurrent = item.selected ? { 'aria-current': true } : null
        return (
          <li className="o-header__subnav-item" key={`item-${index}`}>
            <a
              className={`o-header__subnav-link ${selected}`}
              href={item.url}
              {...ariaCurrent}
              data-trackable={item.label}>
              {item.label}
            </a>
          </li>
        )
      })}
    </ol>
  )
}

const SubSections = ({ subsections }) => {
  const ariaCurrent = subsections && subsections.selected ? { 'aria-current': true } : null
  return (
    <ul
      className="o-header__subnav-list o-header__subnav-list--subsections"
      aria-label="Subsections"
      data-trackable="subsections">
      {subsections.map((item, index) => {
        const id = item.id ? `data-id=subnav-${item.id}` : null
        const selected = item.selected ? 'o-header__subnav-link--highlight' : null
        return (
          <li className="o-header__subnav-item" {...id} key={`item-${index}`}>
            <a
              className={`o-header__subnav-link ${selected}`}
              href={item.url}
              {...ariaCurrent}
              data-trackable={item.label}>
              {item.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export { IncludeCrumbtrail }
