import styled from 'styled-components'

export const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: url(${require(`@/assets/img/wrap3.png`).default}) repeat-y center 0;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  box-sizing: content-box;

  &>.left {
    width: 240px;

    .cpn-top-category:nth-child(1) {
      margin-top: 40px;
    }

    .cpn-top-category:nth-child(2) {
      margin-top: 20px;
    }
  }

  &>.right {
    flex: 1;
    width: 0;
  }
`
