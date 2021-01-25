import styled from 'styled-components'

export const StyleWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const StyleLeft = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;

  button {
    cursor: pointer;
  }

  .play {
    display: flex;
    align-items: center;
    padding: 0 12px 0 8px;
    height: 31px;
    background-position: 0 -387px;

    &:hover {
      background-position: 0 -469px;

      i {
        background-position: -28px -1622px;
      }
    }

    i {
      margin: 0 2px 0 0;
      width: 20px;
      height: 18px;
      background-position: 0 -1622px;
    }

    span {
      font-size: 12px;
      color: #fff;
    }
  }

  .add {
    margin-left: -3px;
    padding: 0;
    width: 32px;
    height: 31px;
    background-position: 0 -1588px;

    &:hover {
      background-position: -40px -1588px;
    }
  }
`

export const StyleRight = styled.div`
  display: flex;
  align-items: center;

  button {
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 2px 0 28px;
    margin-right: 10px;
    height: 31px;
    cursor: pointer;

    i {
      position: absolute;
      top: 0;
      right: -5px;
      width: 5px;
      height: 31px;
      background-position: right -1020px;
    }

    span {
      font-size: 12px;
      color: #333;
    }
  }

  .favor {
    background-position: 0 -977px;
    &:hover {
      background-position: 0 -1063px;
    }
  }

  .share {
    background-position: 0 -1225px;
    &:hover {
      background-position: 0 -1268px;
    }
  }

  .download {
    background-position: 0 -2761px;
    &:hover {
      background-position: 0 -2805px;
    }
  }

  .comment {
    background-position: 0 -1465px;
    &:hover {
      background-position: 0 -1508px;
    }
  }
`
