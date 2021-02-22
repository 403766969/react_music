import React, { memo, useState } from 'react'

import { emojiUrl } from '@/common/constants'

import { StyledWrapper } from './style'

export default memo(function CommentEditor(props) {

  /**
   * props and state
   */
  const { title = '评论', commentTotal } = props

  /**
   * other hooks
   */
  const [textValue, setTextValue] = useState('')
  const [textCount, setTextCount] = useState(140)
  const [isShowEmoji, setIsShowEmoji] = useState(false)

  /**
   * other logic
   */
  const handleTextChange = e => {
    const newValue = e.target.value
    if (newValue.length <= 140) {
      setTextValue(newValue)
      setTextCount(140 - newValue.length)
    }
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
        {
          commentTotal && (
            <span>共{commentTotal}条评论</span>
          )
        }
      </div>
      <div className="main">
        <div className="left">
          <div className="avater"></div>
        </div>
        <div className="right">
          <div className="content">
            <textarea className="text" placeholder="评论" value={textValue} onChange={handleTextChange}></textarea>
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
                    Object.keys(emojiUrl).map(item => {
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
