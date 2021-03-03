import styled from 'styled-components'

export const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;

  &>.content {
    display: flex;
    width: 100%;
    height: 260px;
    background: url(${require('@/assets/img/playpanel_bg.png').default}) repeat-y;
    background-position: -1016px 0;

    &>.left {
      width: 556px;
      height: 100%;
    }

    &>.right {
      flex: 1;
      width: 0;
      height: 100%;

      &>.cpn-scroll-area {
        &>.scroll-main {
          padding: 21px 35px;
        }
      }
    }
  }
`
