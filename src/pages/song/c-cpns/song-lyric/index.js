import React, { memo, useState } from 'react'

import { StyledWrapper } from './style'

export default memo(function SongLyric(props) {

  /**
   * props and state
   */
  const { cpnData = [] } = props

  const [isFold, setIsFold] = useState(true)

  /**
   * other logic
   */
  const lyricRows = isFold ? 13 : cpnData.length

  return cpnData.length > 0 && (
    <StyledWrapper className="cpn-song-lyric" isFold={isFold}>
      <div className="content">
        {
          cpnData.slice(0, lyricRows).map(item => {
            return (
              <p key={item.time + item.content}>
                {item.content}
                <br />
                {item.translation}
              </p>
            )
          })
        }
      </div>
      {
        cpnData.length > 13
        &&
        (
          <div className="control">
            <button onClick={() => setIsFold(!isFold)}>
              {isFold ? '展开' : '收起'}
              <i className="sprite_icon2"></i>
            </button>
          </div>
        )
      }
    </StyledWrapper>
  )
})
