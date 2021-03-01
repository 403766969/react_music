import styled from 'styled-components'

export const StyledWrapper = styled.div`
  .mv-cover {
    position: relative;
    margin-bottom: 8px;
    width: ${props => props.imageWidth}px;
    height: ${props => props.imageHeight}px;
    overflow: hidden;
    cursor: pointer;

    img {
      width: ${props => props.imageWidth}px;
      height: ${props => props.imageHeight}px;      
    }

    .mask {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-position: ${props => props.posX}px ${props => props.posY}px;
    }

    .play {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 44px;
      height: 44px;
      background-position: -30px -135px;
      transform: translate(-50%,-50%);

      &:hover {
        background-position: -30px -85px;
      }
    }
  }

  .mv-desc {
    width: ${props => props.imageWidth}px;
    line-height: 1.4;
    font-size: 14px;

    .name {
      color: #000;

      a {
        color: inherit;
      }
    }
  }
`
