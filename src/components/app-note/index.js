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
            本网站为纯前端项目，使用
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
          <hr className="divide" />
          <p className="text">
            页面：
             <span className="possess">推荐页、排行榜页、歌单页、歌曲详情页、歌手详情页、专辑详情页、歌单详情页、MV详情页、搜索页面</span>
          </p>
          <p className="text">
            功能：
             <span className="possess">歌曲播放、暂停、切换，播放模式切换，播放进度调节，音量调节</span>
          </p>
          <button className="confirm" onClick={handleConfirmClick}>知道了</button>
        </div>
      </div>
    </StyledWrapper>
  )
})
