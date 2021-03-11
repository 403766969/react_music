import React, { memo, useState, useCallback } from 'react'
import { NavLink } from 'react-router-dom'

import { StyledWrapper } from './style'

export default memo(function SongsheetIntro(props) {

  /**
   * props and state
   */
  const { tags, description } = props

  const [isShowFold, setIsShowFold] = useState(false)
  const [isFold, setIsFold] = useState(true)

  /**
   * other hooks
   */
  const descRef = useCallback(node => {
    if (node && node.offsetHeight > 90) {
      setIsShowFold(true)
    } else {
      setIsShowFold(false)
    }
    setIsFold(true)
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
      <div className="desc" style={{ height: (isShowFold && isFold) ? '90px' : 'auto' }} ref={descRef}>
        {
          descArr.map((item, index) => {
            return (
              <p key={item + index}>{item}</p>
            )
          })
        }
      </div>
      <div className="fold" style={{ display: isShowFold ? 'block' : 'none' }}>
        <p style={{ display: isFold ? 'block' : 'none' }}>...</p>
        <button className="control" onClick={() => setIsFold(!isFold)}>
          {isFold ? '展开' : '收起'}
          <i className="sprite_icon2"></i>
        </button>
      </div>
    </StyledWrapper>
  )
})
