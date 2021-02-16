import styled from 'styled-components'

export const StyledWrapper = styled.div`
  .title {
    height: 21px;
    line-height: 20px;
    font-size: 12px;
    font-weight: bold;
    color: #333;
    border-bottom: 1px solid #cfcfcf;
  }

  .comment-list {
    .comment-item {
      display: flex;
      padding: 15px 0;
      border-top: 1px dotted #ccc;

      .avater {
        width: 50px;
        height: 50px;

        img {
          width: 50px;
          height: 50px;
        }
      }

      .content {
        flex: 1;
        margin-left: 10px;
        width: 0;
        font-size: 12px;

        .top {
          line-height: 20px;
          overflow: hidden;

          .user {
            margin-right: 5px;
            color: #0c73c2;
          }

          .vip {
            display: inline-block;
            margin-right: 5px;
            width: 35px;
            height: 12px;
            vertical-align: text-bottom;

            &.vip-1 {
              background: url(${require('@/assets/img/vip-1.png').default}) 0 0 / contain no-repeat;
            }

            &.vip-2 {
              background: url(${require('@/assets/img/vip-2.png').default}) 0 0 / contain no-repeat;
            }

            &.vip-3 {
              background: url(${require('@/assets/img/vip-3.png').default}) 0 0 / contain no-repeat;
            }

            &.vip-4 {
              background: url(${require('@/assets/img/vip-4.png').default}) 0 0 / contain no-repeat;
            }

            &.vip-5 {
              background: url(${require('@/assets/img/vip-5.png').default}) 0 0 / contain no-repeat;
            }

            &.vip-6 {
              background: url(${require('@/assets/img/vip-6.png').default}) 0 0 / contain no-repeat;
            }

            &.vip-7 {
              background: url(${require('@/assets/img/vip-7.png').default}) 0 0 / contain no-repeat;
            }
          }

          .text {
            color: #333;

            a {
              color: #0c73c2;
            }
          }
        }

        .mid {
          margin-top: 10px;
          padding: 8px 19px;
          line-height: 20px;
          background-color: #f4f4f4;
          border: 1px solid #dedede;
          overflow: hidden;

          .user {
            margin-right: 5px;
            color: #0c73c2;
          }

          .text {
            color: #666;

            a {
              color: #0c73c2;
            }
          }
        }

        .bottom {
          display: flex;
          justify-content: space-between;
          margin-top: 15px;

          .time {
            color: #999;
          }

          .operation {
            .like {
              color: #333;
              cursor: pointer;

              .like-icon {
                display: inline-block;
                margin-right: 5px;
                width: 15px;
                height: 14px;
                background-position: -150px 0;
                vertical-align: text-bottom;
              }

              &:hover {
                text-decoration: underline;

                .like-icon {
                  background-position: -150px -20px;
                }
              }
            }

            .divide {
              margin: 0 8px;
              color: #ccc;
            }

            .reply {
              color: #666;
              cursor: pointer;

              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }

      &:first-child {
        border-top: none;
      }
    }
  }
`
