import styled from 'styled-components'

export const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  &>.scroll-main {
    flex: 1;
    width: 0;
    height: 100%;

    &>.wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;

      &>.content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
      }
    }
  }

  &>.scroll-bar {
    width: 6px;
    height: 100%;

    &>.track {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #000;
      opacity: .5;
      overflow: hidden;

      &>.grip {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 0;
        background-color: #868686;
        border: 1px solid #a6a6a6;
        border-radius: 5px;
        opacity: .8;
        cursor: pointer;
      }
    }
  }
`
