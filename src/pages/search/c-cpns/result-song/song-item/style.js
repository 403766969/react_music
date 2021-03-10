import styled from 'styled-components'

export const StyledWrapper = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 18px;
  background-color: #fff;
  border: 1px solid #fff;
  box-sizing: content-box;

  &:nth-child(even) {
    background-color: #f7f7f7;
    border-color: #f7f7f7;
  }

  &:hover {
    background-color: #f2f2f2;
    border-color: #e1e1e1;

    .operation {
      display: flex;
    }
  }

  .name, .operation, .artist, .album, .duration {
    height: 20px;
    line-height: 20px;
  }

  .name {
    flex: 1;
    width: 0;

    .name-content {
      display: inline-block;
      position: relative;
      padding-left: 22px;
      padding-right: 25px;
      max-width: 100%;

      .play-btn {
        display: block;
        position: absolute;
        top: 50%;
        left: 0;
        width: 17px;
        height: 17px;
        background-position: 0 -103px;
        transform: translateY(-50%);
        cursor: pointer;

        &:hover {
          background-position: 0 -128px;
        }

        &.active {
          background-position: -20px -128px;
        }
      }

      .link {
        color: #333;
      }

      .tna {
        color: #aeaeae;
      }

      .mv {
        display: block;
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

  .artist {
    margin-right: 12px;
    width: 15%;
    color: #333;

    .link {
      color: #333;
    }
  }

  .album {
    margin-right: 12px;
    width: 18%;
    color: #666;
  }

  .duration {
    margin-right: 22px;
  }
`
