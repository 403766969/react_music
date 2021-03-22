import styled from 'styled-components'

export const StyledWrapper = styled.div`
  position: relative;
  padding-right: 6px;
  width: 100%;
  height: 100%;

  &>.scroll-main {
    width: 100%;
    height: 100%;

    &>.scroll-wrapper {
      width: 100%;
      height: 100%;
      overflow: hidden;

      &>.scroll-content {
        width: 100%;
      }
    }
  }

  &>.scroll-bar {
    position: absolute;
    top: 0;
    right: 0;
    width: 6px;
    height: 100%;

    &>.scroll-track {
      width: 100%;
      height: 100%;
      background-color: #000;
      opacity: .5;
      overflow: hidden;

      &>.scroll-grip {
        display: block;
        width: 100%;
        background-color: #868686;
        border: 1px solid #a6a6a6;
        border-radius: 5px;
        opacity: .8;
        cursor: pointer;
      }
    }
  }
`
