import styled from 'styled-components'

export const StyledWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  border: 1px solid #bebebe;
  border-radius: 4px;
  box-shadow: 0 4px 7px #555;

  .top {
    height: 17px;
    line-height: 17px;
    padding: 11px 10px;
    border-bottom: 1px solid #e2e2e2;
    box-sizing: content-box;

    .link {
      color: #666;
      text-decoration: none;

      &:hover {
        background-color: #e3e5e7;
      }
    }
  }

  .content {
    .row {
      display: flex;

      &>h3 {
        position: relative;
        padding: 10px 0 0 29px;
        width: 62px;
        line-height: 17px;

        i {
          display: block;
          position: absolute;
          top: 11px;
          left: 10px;
          width: 14px;
          height: 15px;

          &.songs {
            background-position: -35px -300px;
          }

          &.artists {
            background-position: -50px -300px;
          }

          &.albums {
            background-position: -35px -320px;
          }
        }

        span {
          font-size: 12px;
        }
      }

      &>ul {
        flex: 1;
        padding: 5px 0;
        width: 0;
        border: 1px solid #e2e2e2;
        border-width: 1px 0 0 1px;

        li {
          width: 100%;

          .link {
            display: block;
            padding: 0 12px;
            width: 100%;
            height: 24px;
            line-height: 24px;
            text-decoration: none;
            color: #000;

            &:hover {
              background-color: #e3e5e7;
            }
          }
        }
      }

      &:first-child {
        &>ul {
          border-top: none;
        }
      }

      &:nth-child(even) {
        &>ul {
          background-color: #f9f8f8;
        }
      }
    }
  }
`
