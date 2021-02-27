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
      position: relative;
      padding-right: 6px;
      width: 556px;
      height: 100%;

      .cpn-scroll-bar {
        position: absolute;
        right: 0;
        top: 0;
      }
    }

    &>.right {
      flex: 1;
      position: relative;
      padding: 21px 41px 21px 35px;
      width: 0;
      height: 100%;

      .cpn-scroll-bar {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
`
