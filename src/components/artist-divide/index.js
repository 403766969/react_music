import React, { memo, Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import { StyledWrapper } from './style'

export default memo(function ArtistDivide(props) {

  /**
   * props and state
   */
  const { artistList, divide = '/' } = props

  /**
   * render logic
   */
  let title = ''
  let divideCount = 0
  if (artistList) {
    const temp = artistList.reduce((prev, cur) => {
      return prev + cur.name + divide
    }, '')
    title = temp.slice(0, temp.length - divide.length)
    divideCount = artistList.length - 1
  }

  return (
    <StyledWrapper className="cpn-artist-divide" title={title}>
      {
        artistList && artistList.map((item, index) => {
          return (
            <Fragment key={item.id + index}>
              <NavLink to={`/artist?id=${item.id}`}>{item.name}</NavLink>
              {
                index < divideCount && (
                  <i>{divide}</i>
                )
              }
            </Fragment>
          )
        })
      }
    </StyledWrapper>
  )
})
