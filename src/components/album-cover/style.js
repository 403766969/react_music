import styled from 'styled-components'

export const StyledWrapper = styled.div`
  .top-cover {
    position: relative;
    margin-bottom: 7px;
    width: ${props => props.coverWidth};
    height: ${props => props.coverHeight};
    overflow: hidden;
    cursor: pointer;

    img {
      width: ${props => props.imageWidth};
      height: ${props => props.imageHeight};
    }

    .mask {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-position: 0 ${props => props.backgroundPosition};
    }
  }

  .bottom-dec {
    width: ${props => props.imageWidth};
    font-size: 12px;

    .name {
      color: #000;
    }

    .artist {
      color: #666;
    }

    .name, .artist {
      cursor: pointer;
      
      &:hover{
        text-decoration: underline;
      }
    }
  }
`
