import React, { memo, useState } from 'react'

import { StyledWrapper } from './style'

export default memo(function BackTop() {

  /**
   * props and state
   */
  const [isShow, setIsShow] = useState(true)

  /**
   * other logic
   */
  const handleConfirmClick = () => {
    setIsShow(false)
  }

  return (
    <StyledWrapper className="cpn-app-note" style={{ display: isShow ? 'flex' : 'none' }}>
      <div className="box">
        <div className="header">
          <h3 className="title">注意事项</h3>
        </div>
        <div className="content">
          <p className="text">
            仿网易云音乐web版，使用
            <a className="link" href="https://react.docschina.org" target="_blank" rel="noreferrer"> react </a>
            框架开发
            </p>
          <p className="text">
            数据接口来源于开源项目
            <a className="link" href="https://github.com/Binaryify/NeteaseCloudMusicApi" target="_blank" rel="noreferrer"> NeteaseCloudMusicApi(github) </a>
          </p>
          <p className="text">
            开发目的仅用于学习交流，切勿他用
          </p>
          <button className="confirm" onClick={handleConfirmClick}>知道了</button>
        </div>
      </div>
    </StyledWrapper>
  )
})
