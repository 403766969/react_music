import styled from 'styled-components'

export const StyledWrapper = styled.li`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #fff;

  &:nth-child(even) {
    background-color: #f7f7f7;
    border-color: #f7f7f7;
  }

  &:hover {
    background-color: #f2f2f2;
    border-color: #e1e1e1;

    .name .operation {
      display: flex;
    }
  }

  .play {
    padding: 5px 10px 5px 17px;

    .play-btn {
      display: block;
      width: 17px;
      height: 17px;
      background-position: 0 -103px;
      cursor: pointer;

      &:hover {
        background-position: 0 -128px;
      }
    }
  }

  .cover {
    padding: 5px 10px;

    .link {
      display: block;
      position: relative;
      width: 50px;
      height: 50px;

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
        background-position: -160px 0;
      }
    }
  }

  .name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 330px;
    margin-left: 10px;

    .text {
      flex: 1;
      width: 0;
      height: 18px;
      line-height: 18px;

      .link {
        color: #333;
      }
    }

    .operation {
      display: none;
      justify-content: center;
      align-items: center;
      margin: 0 10px;

      .btn {
        display: block;
        margin-right: 8px;
        height: 16px;
        cursor: pointer;

        &:last-child {
          margin-right: 0;
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

  .song-count {
    margin-left: 33px;
    width: 35px;
    color: #999;
  }

  .creator {
    padding: 0 10px;
    width: 170px;
    color: #666;

    .link {
      margin-left: 7px;
      color: #666;
    }
  }

  .favor-count {
    padding: 0 10px;
    width: 100px;
    color: #999;
  }

  .play-count {
    padding: 0 10px;
    width: 100px;
    color: #999;
  }
`
