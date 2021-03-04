import styled from 'styled-components'

export const StyledWrapper = styled.div`
  &>.operation {
    display: flex;
    margin-bottom: 10px;

    .btn {
      margin: 0;
      padding: 0;
      cursor: pointer;
    }

    .play {
      position: relative;
      padding: 0 9px 0 30px;
      height: 31px;
      line-height: 31px;
      background-position: 0 -387px;

      .icon {
        display: block;
        position: absolute;
        top: 50%;
        left: 8px;
        width: 20px;
        height: 18px;
        background-position: 0 -1622px;
        transform: translateY(-50%);
      }

      span {
        color: #fff;
      }

      &:hover {
        background-position: 0 -469px;

        .icon {
          background-position: -28px -1622px;
        }
      }
    }

    .add {
      width: 31px;
      height: 31px;
      background-position: 0 -1588px;

      &:hover {
        background-position: -40px -1588px;
      }
    }

    .favor {
      position: relative;
      margin-left: 5px;
      padding: 0 4px 0 28px;
      height: 31px;
      line-height: 31px;
      font-family: simsun;
      background-position: 0 -977px;
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
        background-position: 0 -1063px;

        .border {
          background-position: right -1106px;
        }
      }
    }
  }

  &>.cpn-song-list {
    border: none;
  }
`
