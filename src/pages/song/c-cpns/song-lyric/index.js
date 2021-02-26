import React, { memo, useState } from 'react'

import { StyledWrapper } from './style'

export default memo(function SongLyric(props) {

  /**
   * props and state
   */
  const { songLyric } = props

  const [isFold, setIsFold] = useState(true)

  /**
   * other logic
   */
  const lyricRows = isFold ? 13 : (songLyric ? songLyric.length : 0)

  return (
    <StyledWrapper className="cpn-song-lyric" isFold={isFold}>
      <div className="content">
        {
          songLyric && songLyric.slice(0, lyricRows).map(item => {
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
        songLyric && songLyric.length > 13 && (
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
