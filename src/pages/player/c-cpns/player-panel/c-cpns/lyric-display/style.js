import styled from 'styled-components'

export const StyledWrapper = styled.div`
  .lyric-item {
    width: 100%;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    color: #989898;
    text-align: center;
    transition: color 0.7s linear;

    &.active {
      font-size: 14px;
      color: #fff;
    }
  }
`
