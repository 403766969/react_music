import React, { memo } from 'react'

import { NavLink } from 'react-router-dom'

import {
  StyledWrapper
} from './style'

export default memo(function ArtistsDivide(props) {

  /**
   * props and state
   */
  const { artists = [] } = props

  const temp = artists.reduce((prev, cur) => {
    return prev + cur.name + '/'
  }, '')

  const title = temp.slice(0, temp.length - 1)

  return (
    <StyledWrapper title={title} >
      {
        artists.map(item => {
          return (
            <NavLink key={item.id + item.name}
              to={`/artist?id=${item.id}`}>
              {item.name}
            </NavLink>
          )
        })
      }
    </StyledWrapper>
  )
})