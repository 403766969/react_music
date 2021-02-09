import styled from 'styled-components'

export const StyledWrapper = styled.div`
  margin-bottom: 35px;

  &>.panel {
    position: relative;
    height: 186px;
    background-color: #f5f5f5;
    border: 1px solid #d3d3d3;

    &>.content {
      margin: 29px auto 0 auto;
      width: 645px;

      .carousel-page {
        display: flex !important;
        justify-content: space-around;
      }
    }
  }

  .control {
    .arrow {
      display: block;
      position: absolute;
      top: 71px;
      width: 17px;
      height: 17px;
      cursor: pointer;
    }

    .arrow-left {
      left: 5px;
      background-position: -260px -75px;
    }

    .arrow-right {
      right: 5px;
      background-position: -300px -75px;
    }
  }
`
