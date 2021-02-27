import styled from 'styled-components'

export const StyledWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: -47px;
  z-index: 9999;
  padding-top: 20px;
  width: 100%;
  height: 67px;
  background-position: 0 14px;
  background-repeat: repeat-x;
  transition: all .4s ease-in;

  &:hover, &.show {
    bottom: 0;
    transition: all .2s ease-in;
  }

  &>.player-panel-wrapper {
    position: absolute;
    left: 50%;
    bottom: 47px;
    width: 982px;
    height: 301px;
    transform: translateX(-50%);
  }

  &>.player-lock {
    position: absolute;
    top: 0;
    right: 0;
    width: 52px;
    height: 22px;
    background-position: 0 -380px;

    .icon-lock {
      display: block;
      position: absolute;
      top: 6px;
      left: 15.5px;
      width: 18px;
      height: 18px;
      background-position: -79px -380px;
      cursor: pointer;

      &:hover {
        background-position: -79px -400px;
      }

      &.locked {
        background-position: -99px -380px;

        &:hover {
          background-position: -99px -400px;
        }
      }
    }
  }
`
