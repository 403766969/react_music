import styled from 'styled-components'

export const StyledWrapper = styled.div`
  .top-cover {
    position: relative;
    margin-bottom: 7px;
    width: ${props => props.coverWidth}px;
    height: ${props => props.coverHeight}px;
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
      background-position: 0 ${props => props.backgroundPosition}px;
    }

    .play {
      display: none;
      position: absolute;
      bottom: 5px;
      right: ${props => props.coverWidth - props.imageHeight + 5}px;
      width: 22px;
      height: 22px;
      background-position: 0 -85px;

      &:hover {
        background-position: 0 -110px;
      }
    }

    &:hover {
      .play {
        display: block;
      }
    }
  }

  .bottom-desc {
    width: ${props => props.imageWidth}px;
    font-size: 12px;

    .name a{
      color: #000;
    }

    .artist a{
      color: #666;
    }
  }
`
