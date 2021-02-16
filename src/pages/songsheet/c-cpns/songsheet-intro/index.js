import React, { memo, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { StyledWrapper } from './style'

export default memo(function SongsheetIntro(props) {

  /**
   * props and state
   */
  const { tags = [], description = '' } = props

  const [isFold, setIsFold] = useState(true)

  /**
   * other logic
   */
  const decArr = description.split('\n')
  decArr[0] = '介绍：' + decArr[0]

  const rows = isFold ? 13 : decArr.length

  return (
    <StyledWrapper className="cpn-songsheet-intro" isFold={isFold}>
      <div className="tags">
        <b>标签：</b>
        {
          tags.map((item, index) => {
            return (
              <NavLink to={`/discover/songsheet?cat=${item}`} key={item + index}>{item}</NavLink>
            )
          })
        }
      </div>
      <div className="dec">
        {
          decArr.slice(0, rows).map((item, index) => {
            return (
              <p key={item + index}>{item}</p>
            )
          })
        }
      </div>
      {
        decArr.length > 13
        &&
        (
          <div className="control">
            <button onClick={e => setIsFold(!isFold)}>
              {isFold ? '展开' : '收起'}
              <i className="sprite_icon2"></i>
            </button>
          </div>
        )
      }
    </StyledWrapper>
  )
})
