import styled from 'styled-components'

export const StyledWrapper = styled.div`

`

export const StyledImage = styled.div`
  position: relative;
  margin-bottom: 7px;
  width: ${props => props.coverW};
  height: ${props => props.coverH};
  overflow: hidden;
  cursor: pointer;

  img {
    width: ${props => props.imgW};
    height: ${props => props.imgH};
  }

  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-position: 0 ${props => props.bgPos};
  }
`

export const StyledDec = styled.div`
  width: ${props => props.imgW};
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
`
