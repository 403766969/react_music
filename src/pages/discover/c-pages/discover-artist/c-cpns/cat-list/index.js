import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { artistCategories } from '@/services/local-data'

import { StyledWrapper } from './style'

export default memo(function CatList(props) {

  /**
   * props and state
   */
  const { area, type } = props

  return (
    <StyledWrapper className="cpn-cat-list">
      {
        artistCategories && artistCategories.map(item => {
          return (
            <div className="content" key={item.area}>
              <h2 className="title">{item.title}</h2>
              <ul className="list">
                {
                  item.subs && item.subs.map(sub => {
                    return (
                      <li className={`sub ${(item.area === area && sub.type === type) ? 'active' : ''}`} key={sub.type}>
                        <NavLink
                          className="link"
                          to={`/discover/artist?area=${item.area}&type=${sub.type}`}
                          title={sub.title}>{sub.title}</NavLink>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          )
        })
      }
    </StyledWrapper>
  )
})
