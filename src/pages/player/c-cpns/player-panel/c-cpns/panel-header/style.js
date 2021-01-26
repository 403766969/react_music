import styled from 'styled-components'

export const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 41px;
  background: url(${require('@/assets/img/playpanel_bg.png').default}) no-repeat;
  background-position: -2px 0;
`

export const StyledLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 556px;

  .title {
    font-size: 14px;
    font-weight: bold;
    color: #e2e2e2;
    margin-left: 28px;
  }

  .operator {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;

    button {
      margin: 0;
      padding: 0;
      color: #ccc;
      font-size: 12px;
      background-color: transparent;
      cursor: pointer;

      .icon {
        display: inline-block;
        margin-right: 6px;
        vertical-align: middle;
      }

      .favor {
        width: 16px;
        height: 16px;
        background-position: -24px 0;
      }

      .clear {
        width: 13px;
        height: 16px;
        background-position: -51px 0;
      }
    }

    .divide {
      margin: 0 10px;
      height: 16px;
      border-left: 1px solid #000;
      border-right: 1px solid #2c2c2c;
    }
  }

`

export const StyledRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 0;

  .song-name {
    padding: 0 50px;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    color: #fff;
  }

  .close {
    display: block;
    position: absolute;
    right: 10px;
    top: 50%;
    width: 30px;
    height: 30px;
    background-position: -195px 9px;
    transform: translateY(-50%);
    cursor: pointer;

    &:hover {
      background-position: -195px -21px;
    }
  }
`
