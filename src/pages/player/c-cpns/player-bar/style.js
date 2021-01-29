import styled from 'styled-components'

export const StyleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 53px;
  background-position: 0 0;
  background-repeat: repeat;

  &.hidden {
    bottom: -40px;
    transition: all .4s ease-in;

    &:hover {
      bottom: 0;
      transition: all .2s ease-in;
    }
  }
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
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 28px;
      line-height: 28px;
      font-size: 12px;

      .song {
        margin-right: 15px;
        max-width: 300px;
        color: #e8e8e8;

        a {
          color: inherit;
        }
      }

      .artists {
        max-width: 220px;
        color: #9b9b9b;
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

          &:hover {
            background-position: 0 -280px;
          }

          &:focus {
            box-shadow: none;
          }
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
      position: relative;
      background-position: -2px -247px;

      &:hover {
        background-position: -31px -247px;
      }

      .volume-bar {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 50%;
        top: -124px;
        z-index: 99;
        width: 32px;
        height: 113px;
        background-position: 0 -503px;
        transform: translateX(-50%);

        .ant-slider {
          margin: 0;
          padding: 0;
          width: 4px;
          height: 93px;

          .ant-slider-rail {
            background: none;
          }

          .ant-slider-track {
            background: url(${require('@/assets/img/playbar_sprite.png').default}) -40px bottom;
          }

          .ant-slider-handle {
            margin-left: -7.5px;
            width: 18px;
            height: 18px;
            background: url(${require('@/assets/img/sprite_icon.png').default}) -40px -250px;
            border: none;

            &:hover {
              background-position: -40px -280px;
            }

            &:focus {
              box-shadow: none;
            }
          }
        }
      }

      .hidden {
        display: none;
      }
    }

    .list-loop {
      background-position: -3px -344px;

      &:hover {
        background-position: -33px -344px;
      }
    }

    .single-loop {
      background-position: -66px -344px;

      &:hover {
        background-position: -93px -344px;
      }
    }

    .random-play {
      background-position: -66px -248px;

      &:hover {
        background-position: -93px -248px;
      }
    }

    .playlist {
      padding-left: 25px;
      padding-right: 8px;
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

export const StyleLock = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  right: 2px;
  bottom: 43px;
  width: 52px;
  height: 24px;
  background-position: 1px -380px;

  i {
    display: block;
    width: 18px;
    height: 18px;
    background-position: -79px -380px;
    cursor: pointer;

    &:hover {
      background-position: -79px -400px;
    }

    &.locked {
      background-position: -99px -380px;

      &:hover {
        background-position: -99px -400px;
      }
    }
  }
`
