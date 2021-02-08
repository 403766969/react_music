import styled from 'styled-components'

export const StyledWrapper = styled.div`
  position: relative;

  .panel-top {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 40px;

    .current-select {
      font-size: 24px;
      font-weight: normal;
    }

    .top-selector {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-left: 12px;
      padding-left: 3px;
      width: 88px;
      height: 31px;
      background-position: 0 -59px;
      cursor: pointer;

      &::after {
        content: "";
        display: block;
        position: absolute;
        right: -3px;
        top: 0;
        width: 8px;
        height: 100%;
        background: url(${require('@/assets/img/sprite_button.png').default}) no-repeat;
        background-position: right -100px;
      }

      &:hover {
        background-position: 0 -141px;

        &::after {
          background-position: right -182px;
        }
      }

      span {
        color: #0c73c2
      }

      i {
        margin-left: 5px;
        width: 8px;
        height: 5px;
        background-position: -70px -543px;
      }
    }
  }

  .panel-content {
    position: absolute;
    left: -40px;
    top: 40px;
    width: 720px;

    .content-header {
      position: relative;
      height: 32px;
      background: url(${require('@/assets/img/sltlyr.png').default}) 0 0 no-repeat;

      .arrow {
        display: block;
        position: absolute;
        top: 1.5px;
        left: 132px;
        width: 24px;
        height: 11px;
        background-position: -48px 0;
      }
    }

    .content-footer {
      height: 20px;
      background: url(${require('@/assets/img/sltlyr.png').default}) -1440px -12px no-repeat;
    }

    .content-body {
      padding: 0 10px;
      background: url(${require('@/assets/img/sltlyr.png').default}) -720px 0 repeat-y;

      .body-top {
        padding-left: 26px;
        height: 38px;
        border-bottom: 1px solid #e6e6e6;

        span {
          display: block;
          width: 75px;
          height: 26px;
          line-height: 26px;
          font-size: 12px;
          font-weight: normal;
          color: #333;
          text-align: center;
          background-position: 0 -64px;
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      .body-list {
        .list-li {
          display: flex;
          justify-content: center;
          align-items: flex-start;

          .li-left {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 15px 0 0 26px; 
            width: 96px;

            i {
              margin-right: 8px;
              width: 24px;
              height: 24px;

              &.icon-0 {
                background-position: -20px -735px;
              }

              &.icon-1 {
                background-position: 0 -60px;
              }

              &.icon-2 {
                background-position: 0 -88px
              }

              &.icon-3 {
                background-position: 0 -117px;
              }

              &.icon-4 {
                background-position: 0 -141px;
              }
            }

            span {
              font-size: 12px;
              font-weight: bold;
              color: #333;
            }
          }

          .li-right {
            flex: 1;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            padding: 16px 15px 0 15px;
            width: 0;
            min-height: 40px;
            border-left: 1px solid #e6e6e6;

            .right-item {
              height: 24px;
              line-height: 24px;
              font-size: 12px;

              .name {
                color: #333;
                cursor: pointer;

                &:hover {
                  text-decoration: underline;
                }

                &.active {
                  padding: 2px 6px;
                  color: #fff;
                  background: #a7a7a7;
                }
              }

              .divider {
                margin: 0 10px;
                color: #d8d8d8;
              }
            }
          }

          &:last-child .li-right {
            padding-bottom: 16px;
          }
        }
      }
    }
  }
`
