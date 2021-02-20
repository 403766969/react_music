import styled from 'styled-components'

export const StyledWrapper = styled.div`
  .title {
    display: flex;
    height: 35px;
    border-bottom: 2px solid #c20c0c;

    h3 {
      line-height: 28px;
      font-size: 20px;
      font-weight: normal;
    }

    span {
      margin: 7px 0 0 20px;
      font-size: 12px;
      color: #666;
    }
  }

  .main {
    display: flex;
    margin-top: 20px;

    .left {
      width: 62px;

      .avater {
        width: 50px;
        height: 50px;
        background: url(${require('@/assets/img/default_avatar.jpg').default}) 0 0 / contain no-repeat;
      }
    }

    .right {
      flex: 1;
      width: 0;

      .content {
        position: relative;
        padding: 5px 6px;
        height: 63px;
        border: 1px solid #cdcdcd;

        .text {
          display: block;
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          line-height: 19px;
          background-color: #fff;
          border: none;
          outline: none;
          resize: none;

          &::-webkit-scrollbar {
            display: none;
          }
        }

        .arrow {
          position: absolute;
          top: 11px;
          left: -7px;
          width: 0;
          height: 0;
          border-top: 6.5px solid transparent;
          border-bottom: 6.5px solid transparent;
          border-right: 6.5px solid #cdcdcd;
          box-sizing: border-box;

          .mask {
            display: block;
            position: absolute;
            top: 0;
            left: 1px;
            width: 0;
            height: 0;
            border-top: 6.5px solid transparent;
            border-bottom: 6.5px solid transparent;
            border-right: 6.5px solid #fff;
            box-sizing: border-box;
            transform: translateY(-50%);
          }
        }
      }

      .operation {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 10px;

        .operation-left {
          display: flex;
          align-items: center;
          position: relative;

          .emoji, .at {
            display: block;
            width: 18px;
            height: 18px;
            cursor: pointer;
          }

          .emoji {
            background-position: -40px -490px;
          }

          .at {
            margin-left: 10px;
            background-position: -60px -490px;
          }

          .emoji-list {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 20px;
            left: -12px;
            width: 282px;
            height: 178px;
            background: url(${require('@/assets/img/emoji/emtbg.png').default}) 0 0 no-repeat;

            ul {
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex-wrap: wrap;
              width: 250px;

              li {
                margin: 1px;
                border: 1px solid #fff;
                cursor: pointer;

                &:hover {
                  border-color: #3d91ec;
                }
              }
            }
          }
        }

        .operation-right {
          display: flex;
          align-items: center;
          font-size: 12px;

          .count {
            color: #999;
          }

          .issue {
            display: block;
            margin-left: 10px;
            width: 46px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            color: #fff;
            background-position: -84px -64px;
            cursor: pointer;

            &:hover {
              background-position: -84px -94px;
            }
          }
        }
      }
    }
  }
`
