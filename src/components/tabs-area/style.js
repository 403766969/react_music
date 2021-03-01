import styled from 'styled-components'

export const StyledWrapper = styled.div`
  width: 100%;

  &>.tabs-selector {
    display: flex;
    width: 100%;
    background: url(${require('@/assets/img/tab.png').default}) 0 0 repeat-x;
    border: 1px solid #ccc;
    border-width: 0 1px;

    &>.tabs-tab {
      position: relative;
      padding: 2px 5px 0 5px;
      width: 140px;
      height: 39px;
      line-height: 37px;
      text-align: center;
      background: url(${require('@/assets/img/tab.png').default}) 0 9999px no-repeat;
      cursor: pointer;

      &:first-child {
        margin-left: -1px;
      }

      &:last-child {
        margin-right: -1px;
      }

      &:hover {
        background-position: -5px -45px;
      }

      &.active {
        background-position: left -90px;

        &::after {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          width: 2px;
          height: 100%;
          background: url(${require('@/assets/img/tab.png').default}) right -90px no-repeat;
        }
      }
    }
  }

  &>.tabs-content {
    width: 100%;
  }
`
