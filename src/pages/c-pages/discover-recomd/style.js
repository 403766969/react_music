import styled from 'styled-components'

export const StyledWrapper = styled.div`
  &>.content {
    display: flex;
    background-color: #fff;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
  }

  &>.content>.left {
    padding: 20px;
    width: 729px;
  }

  &>.content>.right {
    width: 250px;
    border-left: 1px solid #d3d3d3;
  }
`
