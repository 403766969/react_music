import styled from 'styled-components'

export const StyledWrapper = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .item {
    margin: 5px 2px;
    padding: 0 5px;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    color: #333;
    cursor: pointer;

    &:first-child,
    &:last-child {
      padding: 0 11px;
      font-size: 12px;
    }

    &.active {
      color: #fff;
      background: #c20c0c;
      border-radius: 2px;
    }

    &:hover {
      text-decoration: underline;
    }
  }
`
