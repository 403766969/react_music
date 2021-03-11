import React, { memo, useState, useCallback } from 'react'

import { StyledWrapper } from './style'

export default memo(function AlbumDesc(props) {

  /**
   * props and state
   */
  const { albumDesc } = props

  const [isShowFold, setIsShowFold] = useState(false)
  const [isFold, setIsFold] = useState(true)

  /**
   * other hooks
   */
  const descRef = useCallback(node => {
    if (node && node.offsetHeight > 72) {
      setIsShowFold(true)
    } else {
      setIsShowFold(false)
    }
    setIsFold(true)
  }, [])

  return albumDesc
    ? (
      <StyledWrapper className="cpn-album-desc" isFold={isFold}>
        <h3 className="title">专辑介绍：</h3>
        <div className="desc" style={{ height: (isShowFold && isFold) ? '72px' : 'auto' }} ref={descRef}>
          <p>{albumDesc}</p>
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
    : null
})
