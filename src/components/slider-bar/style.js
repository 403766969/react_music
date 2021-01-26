import styled from 'styled-components'

export const StyledWrapper = styled.div`
  &.slider-horizontal {
    width: 100%;
    height: 6px;
  }

  &.slider-vertical {
    width: 6px;
    height: 100%;
  }

  .track {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: .5;
  }

  .grip {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #868686;
    border: 1px solid #a6a6a6;
    border-radius: 5px;
    opacity: .8;
    cursor: pointer;
  }

  .slider-vertical {
    &.grip {
      width: 100%;
      height: ${props => props.gripLength + 'px'};
    }
  }
`
