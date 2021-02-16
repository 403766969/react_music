import React, { memo, useState } from 'react'

import { StyledWrapper } from './style'

export default memo(function SongLyric(props) {

  /**
   * props and state
   */
  const { songLyric = [] } = props

  const [isFold, setIsFold] = useState(true)

  /**
   * other logic
   */
  const lyricRows = isFold ? 13 : songLyric.length

  return songLyric.length > 0 && (
    <StyledWrapper className="cpn-song-lyric" isFold={isFold}>
      <div className="content">
        {
          songLyric.slice(0, lyricRows).map(item => {
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
        songLyric.length > 13
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
