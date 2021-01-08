import styled from 'styled-components'

export const StyleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: fixed;
  z-index: 99;
  left: 0;
  right: 0;
  bottom: 0;
  height: 53px;
  background-position: 0 0;
  background-repeat: repeat;
`

export const StyleContent = styled.div`
  display: flex;
  width: 980px;
  height: 47px;
`

export const StyleControl = styled.div`
  display: flex;
  align-items: center;
  width: 137px;
  height: 47px;

  .prev, .next, .play {
    cursor: pointer;
  }
  
  .prev, .next {
    margin-top: 3px;
    width: 28px;
    height: 28px;
  }

  .prev {
    background-position: 0 -130px;

    &:hover {
      background-position: -30px -130px;
    }
  }

  .next {
    background-position: -80px -130px;

    &:hover {
      background-position: -110px -130px;
    }
  }

  .play {
    width: 36px;
    height: 36px;
    margin: 0 8px;
    margin-top: 2px;
    background-position: 0 ${props => props.isPlaying ? '-165px' : '-204px'};

    &:hover {
      background-position: -40px ${props => props.isPlaying ? '-165px' : '-204px'};
    }
  }
`

export const StyleDetail = styled.div`
  display: flex;
  width: 656px;
  height: 47px;

  .image {
    position: relative;
    margin-right: 15px;
    margin-top: 6px;
    width: 34px;
    height: 34px;
    border-radius: 5px;

    img {
      width: 34px;
      height: 34px;
    }

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 34px;
      height: 35px;
      background-position: 0 -80px;
    }
  }

  .info {
    width: 608px;

    .text {
      height: 28px;
      line-height: 28px;
      font-size: 12px;

      .song-name {
        margin-right: 15px;
        color: #e8e8e8;
      }

      .singer-name {
        color: #9b9b9b;

        &::after {
          content: "/"
        }

        &:last-of-type::after {
          content: ""
        }
      }
    }

    .progress {
      display: flex;
      align-items: center;
      margin-top: -5px;

      .ant-slider {
        margin: 0;
        padding: 0;
        width: 493px;
        height: 9px;

        .ant-slider-rail {
          height: 9px;
          background: url(${require('@/assets/img/progress_bar.png').default}) right 0;
        }

        .ant-slider-track {
          height: 9px;
          background: url(${require('@/assets/img/progress_bar.png').default}) left -66px;
        }

        .ant-slider-handle {
          margin-top: -7px;
          width: 22px;
          height: 24px;
          background: url(${require('@/assets/img/sprite_icon.png').default}) 0 -250px;
          border: none;
        }
      }
    }

    .time {
      margin-left: 14px;

      .now-time {
        color: #a1a1a1;
      }

      .total-time {
        color: #797979;
      }
      
      .divider {
        margin: 0 3px;
        color: #797979;
      }
    }
  }
`

export const StyleOperator = styled.div`
  display: flex;
  align-items: center;

  .btn {
    margin-right: 2px;
    padding: 0;
    width: 25px;
    height: 25px;
    cursor: pointer;
  }

  .left {
    display: flex;
    align-items: center;
    width: 59px;
    height: 25px;

    .favor {
      background-position: -88px -163px;

      &:hover {
        background-position: -88px -189px;
      }
    }

    .share {
      background-position: -114px -163px;

      &:hover {
        background-position: -114px -189px;
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    padding-left: 13px;
    height: 25px;
    background-position: -147px -248px;

    .volume {
      background-position: -2px -247px;

      &:hover {
        background-position: -31px -247px;
      }
    }

    .loop {
      background-position: ${props => props.pos};

      &:hover {
        background-position: ${props => props.hoverPos};
      }
    }

    .playlist {
      padding-left: 18px;
      width: 59px;
      text-align: center;
      color: #ccc;
      background-position: -42px -68px;
      
      &:hover {
        background-position: -42px -98px;
      }
    }
  }
`
