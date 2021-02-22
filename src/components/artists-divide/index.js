import React, { memo, Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import { StyledWrapper } from './style'

export default memo(function ArtistsDivide(props) {

  /**
   * props and state
   */
  const { cpnData = [], divide = '/' } = props

  /**
   * render logic
   */
  const temp = cpnData.reduce((prev, cur) => {
    return prev + cur.name + divide
  }, '')

  const title = temp.slice(0, temp.length - divide.length)

  const divideCount = cpnData.length - 1

  return cpnData.length > 0 && (
    <StyledWrapper className="cpn-artists-divide" title={title}>
      {
        cpnData.map((item, index) => {
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
