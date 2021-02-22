import styled from 'styled-components'

export const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: url(${require(`@/assets/img/wrap3.png`).default}) repeat-y center 0;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;

  &>.left {
    width: 239px;

    .cpn-chart-list:nth-child(1) {
      margin-top: 40px;
    }

    .cpn-chart-list:nth-child(n+2) {
      margin-top: 20px;
    }
  }

  &>.right {
    flex: 1;
    position: relative;
    padding: 40px;
    width: 0;

    .cpn-chart-intro {
      margin-bottom: 40px;
    }

    .cpn-song-area {
      margin-bottom: 40px;
    }
  }
`
