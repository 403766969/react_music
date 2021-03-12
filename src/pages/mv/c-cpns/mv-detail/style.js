import styled from 'styled-components'

export const StyledWrapper = styled.div`
  &>.header {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    padding-left: 35px;

    .mv-icon {
      display: block;
      position: absolute;
      top: 7px;
      left: 0;
      width: 29px;
      height: 18px;
      background-position: -230px -480px;
    }

    .title {
      margin-right: 8px;
      max-width: 100%;
      line-height: 32px;
      font-size: 24px;
      font-weight: normal;
    }

    .artists {
      margin-top: 13px;
      max-width: 100%;
      line-height: 17px;
      color: #0c73c2;
    }
  }

  &>.content {
    margin-top: 8px;
    width: 640px;
    height: 360px;

    video {
      width: 100%;
      height: 100%;
    }
  }

  &>.operation {
    display: flex;
    margin-top: 12px;

    .btn {
      position: relative;
      margin: 0;
      padding: 0 4px 0 28px;
      height: 31px;
      line-height: 31px;
      cursor: pointer;

      .border {
        position: absolute;
        top: 0;
        right: -4px;
        width: 4px;
        height: 31px;
        background-position: right -1020px;
      }

      &:hover {
        .border {
          background-position: right -1106px;
        }
      }
    }

    .favor {
      background-position: 0 -977px;

      &:hover {
        background-position: 0 -1063px;
      }
    }

    .share {
      margin-left: 8px;
      background-position: 0 -1225px;

      &:hover {
        background-position: 0 -1268px;
      }
    }
  }
`
