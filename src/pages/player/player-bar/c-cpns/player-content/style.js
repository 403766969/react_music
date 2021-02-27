import styled from 'styled-components'

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
  height: 100%;

  .song-cover {
    width: 34px;
    height: 34px;
    border-radius: 5px;
    overflow: hidden;

    .song-link {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }

      .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-position: 0 -80px;
      }
    }
  }

  .song-main {
    margin-left: 15px;
    height: 100%;

    .song-info {
      height: 28px;
      line-height: 28px;

      .song-name {
        display: inline-block;
        max-width: 300px;
        color: #e8e8e8;
      }

      .song-artist {
        display: inline-block;
        margin-left: 15px;
        max-width: 220px;
        color: #9b9b9b;
      }

      .song-name a, .song-artist a {
        color: inherit;
      }
    }

    .song-progress {
      position: relative;
      padding-right: 84px;

      .song-slider {
        width: 493px;
        height: 9px;
        
        &>.ant-slider {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;

          &>.ant-slider-step, &>.ant-slider-mark {
            display: none;
          }

          &>.ant-slider-rail, &>.ant-slider-track, &>.ant-slider-handle {
            margin: 0;
            padding: 0;
          }

          &>.ant-slider-rail {
            width: 100%;
            height: 100%;
            background: url(${require('@/assets/img/progress_bar.png').default}) right 1px;
          }

          &>.ant-slider-track {
            width: 100%;
            height: 100%;
            background: url(${require('@/assets/img/progress_bar.png').default}) left -65px;
          }

          &>.ant-slider-handle {
            top: -6px;
            width: 20px;
            height: 20px;
            background: url(${require('@/assets/img/sprite_icon.png').default}) -1px -251px;
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

      .song-time {
        position: absolute;
        top: 50%;
        right: 0;
        height: 14px;
        line-height: 14px;
        transform: translateY(-50%);

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
  }
`
