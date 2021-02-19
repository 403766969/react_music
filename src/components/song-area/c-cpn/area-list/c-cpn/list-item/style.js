import styled from 'styled-components'

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 30px;

  &:nth-child(2n) {
    background-color: #fff;
  }

  &:nth-child(2n+1) {
    background-color: #f7f7f7;
  }

  &:hover {
    .duration {
       .content {
        display: none;
       }

       .operation {
        display: flex;
       }
    }
  }

  .cell {
    overflow: hidden;
  }

  .cell .content {
    padding: 6px 10px;
  }

  .order .content {
    text-align: center;
    color: #999;
  }

  .name .content {
    display: flex;
    align-items: center;

    .song-cover {
      margin-right: 14px;

      img {
        width: 50px;
        height: 50px;
      }
    }

    .play-btn {
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

    .song-info {
      display: flex;
      align-items: center;
      flex: 1;
      width: 0;

      .song-text {
        display: inline-block;
        position: relative;
        padding-right:24px;
        max-width: 100%;
        height: 17px;
        line-height: 17px;

        .song-tns-alia {
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
    .content {
      color: #666;
    }

    .operation {
      display: none;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;

      .btn {
        display: block;
        margin-right: 4px;
        height: 16px;
        cursor: pointer;

        &:last-child {
          margin-right: 0;
        }
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
        width: 16px;
        background-position: -82px -174px;

        &:hover {
          background-position: -105px -174px;
        }
      }
    }
  }

  .artist .content {
    color: #666;
  }

  .album .content {
    color: #666;
  }
`
