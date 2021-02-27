import styled from 'styled-components'

export const StyledWrapper = styled.div`
  display: flex;
  margin-left: 30px;
  height: 100%;

  .btn {
    margin: 0;
    padding: 0;
    border: 0;
    width: 25px;
    height: 25px;
    cursor: pointer;
  }

  .operation-left {
    display: flex;
    align-items: center;
    height: 100%;

    .favor {
      background-position: -88px -163px;

      &:hover {
        background-position: -88px -189px;
      }
    }

    .share {
      margin-left: 1px;
      background-position: -114px -163px;

      &:hover {
        background-position: -114px -189px;
      }
    }
  }

  .operation-right {
    display: flex;
    align-items: center;
    position: relative;
    margin-left: 22px;
    height: 100%;

    .divide {
      display: block;
      position: absolute;
      top: 50%;
      left: -13px;
      width: 4px;
      height: 24px;
      background-position: -148px -249px;
      transform: translateY(-50%);
    }

    .volume {
      position: relative;
      background-position: -2px -248px;

      &:hover {
        background-position: -31px -248px;
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

        &>.ant-slider {
          margin: 0;
          padding: 0;
          width: 4px;
          height: 93px;

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
            background: none;
          }

          &>.ant-slider-track {
            width: 100%;
            height: 100%;
            background: url(${require('@/assets/img/playbar_sprite.png').default}) -40px bottom;
          }

          &>.ant-slider-handle {
            left: -7.5px;
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

        &.hidden {
          display: none;
        }
      }
    }

    .mode {
      margin-left: 2px;

      &.list-loop {
        background-position: -3px -344px;

        &:hover {
          background-position: -33px -344px;
        }
      }

      &.single-loop {
        background-position: -66px -344px;

        &:hover {
          background-position: -93px -344px;
        }
      }

      &.random-play {
        background-position: -66px -248px;

        &:hover {
          background-position: -93px -248px;
        }
      }
    }

    .list {
      margin-left: 3px;
      padding-left: 24px;
      padding-right: 9px;
      width: 59px;
      text-align: center;
      color: #ccc;
      background-position: -43px -69px;
      
      &:hover {
        background-position: -43px -99px;
      }
    }
  }
`
