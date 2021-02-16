import styled from 'styled-components'

export const StyledWrapper = styled.div`
  display: flex;

  &>.cover {
    position: relative;
    width: 230px;

    img {
      width: 200px;
      height: 200px;
    }

    .mask {
      position: absolute;
      top: -4px;
      left: -4px;
      width: 208px;
      height: 208px;
      background-position: 0 -1285px;
    }
  }

  &>.info {
    width: 410px;

    &>.header {
      display: flex;
      margin-bottom: 12px;

      i {
        position: relative;
        width: 54px;
        height: 24px;
        background-position: 0 -243px;

        &::after {
          content: "";
          display: block;
          position: absolute;
          top: 2px;
          right: 12px;
          width: 8px;
          height: 8px;
          overflow: hidden;
          background: url(${require('@/assets/img/white-r-icon.png').default}) center/contain no-repeat;
        }
      }

      .title {
        flex: 1;
        margin-left: 10px;
        width: 0;
        line-height: 24px;
        font-size: 20px;
        font-weight: normal;
      }
    }

    &>.creator {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .avatar {
        width: 35px;
        height: 35px;
      }

      .nickname {
        margin-left: 10px;
        color: #0c73c2;
      }

      .icon {
        margin-left: 1px;
        width: 13px;
        height: 13px;
      }

      .time {
        margin-left: 15px;
        line-height: 35px;
        color: #999;
      }
    }

    &>.cpn-operation-bar {
      margin-bottom: 25px;
    }
  }
`
