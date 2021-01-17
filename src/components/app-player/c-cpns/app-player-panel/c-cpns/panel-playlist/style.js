import styled from 'styled-components'

export const StyledWrapper = styled.ul`
  padding: 2px;

  .play-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 0 8px 0 25px;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    cursor: pointer;
    
    .left {
      flex: 1;
      color: #ccc;
    }

    .right {
      display: flex;
      justify-content: center;
      align-items: center;

      .operation {
        display: none;

        i {
          display: block;
          margin-left: 10px;
          height: 16px;
        }

        .favor {
          width: 16px;
          background-position: -24px 0;

          &:hover {
            background-position: -24px -20px;
          }
        }

        .share {
          width: 14px;
          background-position: 0 0;

          &:hover {
            background-position: 0 -20px;
          }
        }

        .download {
          width: 14px;
          background-position: -57px -50px;

          &:hover {
            background-position: -80px -50px;
          }
        }

        .remove {
          width: 13px;
          background-position: -51px 0;

          &:hover {
            background-position: -51px -20px;
          }
        }
      }

      .singer {
        margin-left: 10px;
        width: 80px;

        a {
          color: #9b9b9b;

          &::after {
            content: "/"
          }

          &:last-of-type::after {
            content: ""
          }
        }
      }

      .duration {
        margin-left: 10px;
        width: 45px;
        color: #666;
      }

      .link {
        margin-left: 20px;
        margin-right: 5px;
        width: 14px;
        height: 16px;
        background-position: -80px 0px;
      }
    }

    &:hover {
      background-color: #000;

      .operation {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .left,
      .right .singer a,
      .right .duration,
      .right .link {
        color: #fff;
      }
    }

    &.active {
      background-color: #000;

      .left,
      .right .singer a,
      .right .duration,
      .right .link {
        color: #fff;
      }

      ::before {
        content: "";
        position: absolute;
        left: 8px;
        width: 10px;
        height: 13px;
        background: url(${require('@/assets/img/playlist_sprite.png').default}) -182px .5px;
      }
    }
  }
`
