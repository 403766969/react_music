import styled from 'styled-components'

export const StyledWrapper = styled.div`
  &.horizontal {
    width: 100%;
    height: 6px;
  }

  &.vertical {
    width: 6px;
    height: 100%;
  }

  .scroll-track {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: .5;
  }

  .scroll-grip {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #868686;
    border: 1px solid #a6a6a6;
    border-radius: 5px;
    opacity: .8;
    cursor: pointer;

    &.horizontal {
      width: 26px;
      height: 100%;
    }

    &.vertical {
      width: 100%;
      height: 26px;
    }
  }
`
