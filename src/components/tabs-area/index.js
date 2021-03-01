import React, { memo } from 'react'

import { StyledWrapper } from './style'

export default memo(function TabsArea(props) {

  const { children, activeKey, onTabClick } = props

  const handleTabClick = key => {
    if (onTabClick && typeof onTabClick === 'function') {
      onTabClick(key)
    }
  }

  return (
    <StyledWrapper className="cpn-tabs-area">
      <ul className="tabs-selector">
        {
          React.Children.map(children, item => {
            if (item.key) {
              return (
                <li className={`tabs-tab text-nowrap ${item.key === activeKey ? 'active' : ''}`} key={item.key} onClick={() => handleTabClick(item.key)}>
                  <span>{item.props.tab}</span>
                </li>
              )
            } else {
              return null
            }
          })
        }
      </ul>
      <div className="tabs-content">
        {
          React.Children.map(children, item => {
            if (item.key === activeKey) {
              return item.props.children
            } else {
              return null
            }
          })
        }
      </div>
    </StyledWrapper>
  )
})
