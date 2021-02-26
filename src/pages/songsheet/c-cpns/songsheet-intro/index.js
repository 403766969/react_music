import React, { memo, useState, useCallback } from 'react'
import { NavLink } from 'react-router-dom'

import { StyledWrapper } from './style'

export default memo(function SongsheetIntro(props) {

  /**
   * props and state
   */
  const { tags, description } = props

  const [isShowControl, setIsShowControl] = useState(false)
  const [isFold, setIsFold] = useState(true)

  /**
   * other hooks
   */
  const descRef = useCallback(node => {
    if (node && node.offsetHeight > 90) {
      setIsShowControl(true)
    }
  }, [])

  /**
   * other logic
   */
  let descArr = []
  if (description) {
    descArr = description.split('\n')
    descArr[0] = '介绍：' + descArr[0]
  }

  return (
    <StyledWrapper className="cpn-songsheet-intro" isFold={isFold}>
      <div className="tags">
        {
          tags && tags.length > 0 && (
            <b>标签：</b>
          )
        }
        {
          tags && tags.map(item => {
            return (
              <NavLink to={`/discover/songsheet?sub=${item}`} key={item}>{item}</NavLink>
            )
          })
        }
      </div>
      <div className="desc" style={{ height: (isShowControl && isFold) ? '90px' : 'auto' }} ref={descRef}>
        {
          descArr.map((item, index) => {
            return (
              <p key={item + index}>{item}</p>
            )
          })
        }
      </div>
      <p className="ellipsis" style={{ display: (isShowControl && isFold) ? 'block' : 'none' }}>...</p>
      <div className="control" style={{ display: isShowControl ? 'flex' : 'none' }}>
        <button onClick={() => setIsFold(!isFold)}>
          {isFold ? '展开' : '收起'}
          <i className="sprite_icon2"></i>
        </button>
      </div>
    </StyledWrapper>
  )
})
