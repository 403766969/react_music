import styled from 'styled-components'

export const StyledWrapper = styled.div`
  padding: 0 40px 40px 40px;

  .top-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 35px;
    border-bottom: 2px solid #c20c0c;

    .header-left {
      display: flex;

      h3 {
        font-size: 20px;
        font-weight: normal;
        color: #333;
      }

      span {
        margin: 9px 0 0 20px;
        font-size: 12px;
        color: #666;
      }
    }

    .header-right {
      div {
        font-size: 12px;
        color: #666;

        span {
          font-weight: bold;
          color: #c20c0c;
        }
      }
    }
  }

  .song-list {
    display: block;
    border: 1px solid #d9d9d9;
    
    thead, tbody, th, td {
      display: block;
    }

    tr {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .order {
        width: 45px;
      }

      .title {
        flex: 1;
        width: 0;
      }

      .duration{
        width: 91px;
      }

      .singer{
        width: 173px;
      }
    }
  }

  .song-list {
    thead tr {
      height: 35px;
      background: url(${require('@/assets/img/sprite_table.png').default}) 0 0 repeat-x;

      th {
        position: relative;
        padding: 0 10px;
        height: 34px;
        line-height: 34px;
        font-size: 12px;
        font-weight: normal;
        color: #666;

        &::before {
          content: "";
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          width: 2px;
          height: 100%;
          background: url(${require('@/assets/img/sprite_table.png').default}) 0 -56px no-repeat;
        }

        &:first-child::before {
          display: none;
        }
      }
    }

    tbody tr {
      &:nth-child(2n) {
        background-color: #fff;
      }

      &:nth-child(2n+1) {
        background-color: #f7f7f7;
      }

      &:hover td.duration {
        .time {
          display: none;
        }

        .operation {
          display: flex;
        }
      }

      td {
        padding: 6px 10px;
        min-height: 30px;
      }

      .order {
        text-align: center;
        color: #999;
      }

      .title {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .song-cover {
          margin-right: 14px;

          img {
            width: 50px;
            height: 50px;
          }
        }

        .song-play {
          display: block;
          margin-right: 8px;
          width: 17px;
          height: 17px;
          background-position: 0 -103px;
          cursor: pointer;

          &:hover {
            background-position: 0 -128px;
          }
        }

        .song-content {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex: 1;
          width: 0;
          
          .song-text {
            position: relative;
            padding-right:24px;
            height: 17px;
            line-height: 17px;
            max-width: 100%;

            .song-name {
              span {
                font-size: 12px;
                color: #333;
              }
            }

            .song-orgin {
              font-size: 12px;
              color: #aeaeae;
            }

            .song-mv {
              position: absolute;
              right: 0;
              top: 50%;
              width: 23px;
              height: 17px;
              transform: translateY(-50%);

              i {
                display: block;
                width: 23px;
                height: 17px;
                background-position: 0 -151px;

                &:hover {
                  background-position: -30px -151px;
                }
              }
            }
          }
        }
      }

      .duration {
        position: relative;

        .time {
          font-size: 12px;
          color: #666;
        }

        .operation {
          display: none;
          justify-content: center;
          align-items: center;
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          transform: translateY(-50%);

          .btn {
            display: block;
            margin-right: 4px;
            height: 16px;
            cursor: pointer;
          }

          .add {
            width: 15px;
            background-position: 1px -699px;

            &:hover {
              background-position: -21px -699px;
            }
          }

          .favor {
            width: 18px;
            background-position: 0 -174px;

            &:hover {
              background-position: -20px -174px;
            }
          }

          .share {
            width: 16px;
            background-position: -1px -195px;

            &:hover {
              background-position: -21px -195px;
            }
          }

          .download {
            margin-right: 0;
            width: 16px;
            background-position: -82px -174px;

            &:hover {
              background-position: -105px -174px;
            }
          }
        }
      }

      .singer {
        font-size: 12px;
        color: #666;
      }
    }
  }
`
