import styled from 'styled-components'

export const StyledWrapper = styled.div`
  &>.content {
    display: flex;
    background: url(${require(`@/assets/img/wrap1.png`).default}) repeat-y;
    background-color: #fff;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;

    &>.left {
      padding: 20px;
      width: 729px;
    }

    &>.right {
      flex: 1;
      margin-left: 1px;
      width: 0;
    }
  }
`
