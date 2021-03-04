import React, { memo, useState } from 'react'

import { emojiUrl } from '@/common/constants'

import { StyledWrapper } from './style'

export default memo(function CommentEditor(props) {

  /**
   * props and state
   */
  const { title, commentCount = 0 } = props

  /**
   * other hooks
   */
  const [textValue, setTextValue] = useState('')
  const [textCount, setTextCount] = useState(140)
  const [isComposition, setIsComposition] = useState(false)
  const [isShowEmoji, setIsShowEmoji] = useState(false)

  /**
   * other logic
   */
  const handleTextInput = e => {
    const newValue = e.target.value
    if (isComposition) {
      setTextValue(newValue)
    } else {
      if (newValue.length <= 140) {
        setTextValue(newValue)
        setTextCount(140 - newValue.length)
      }
    }
  }

  const handleCompositionStart = e => {
    setIsComposition(true)
  }

  const handleCompositionEnd = e => {
    setIsComposition(false)
    const newValue = e.target.value.slice(0, 140)
    setTextValue(newValue)
    setTextCount(140 - newValue.length)
  }

  const handleEmojiClick = item => {
    const newValue = textValue + item
    if (newValue.length <= 140) {
      setTextValue(newValue)
      setTextCount(140 - newValue.length)
    }
  }

  return (
    <StyledWrapper className="cpn-comment-editor">
      <div className="title">
        <h3>{title}</h3>
        <span>共{commentCount}条评论</span>
      </div>
      <div className="main">
        <div className="left">
          <div className="avater"></div>
        </div>
        <div className="right">
          <div className="content">
            <textarea
              className="text"
              placeholder="评论"
              value={textValue}
              onInput={handleTextInput}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}></textarea>
            <div className="arrow">
              <i className="mask"></i>
            </div>
          </div>
          <div className="operation">
            <div className="operation-left">
              <span className="emoji sprite_icon2" onClick={() => setIsShowEmoji(!isShowEmoji)}></span>
              <span className="at sprite_icon2"></span>
              <div className="emoji-list" style={{ display: isShowEmoji ? 'flex' : 'none' }}>
                <ul>
                  {
                    emojiUrl && Object.keys(emojiUrl).map(item => {
                      return (
                        <li key={item} title={item} onClick={() => handleEmojiClick(item)}>
                          <img src={emojiUrl[item]} alt={item} />
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
            <div className="operation-right">
              <span className="count">{textCount}</span>
              <span className="issue sprite_button2">评论</span>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  )
})
