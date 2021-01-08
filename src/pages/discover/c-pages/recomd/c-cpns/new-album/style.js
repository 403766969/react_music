import styled from 'styled-components'

export const StyledWrapper = styled.div`
  margin-bottom: 35px;

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 184px;
    background-color: #f5f5f5;
    border: 1px solid #d3d3d3;

    .arrow {
      width: 30px;
      height: 17px;
      cursor: pointer;
    }

    .arrow-left {
      background-position: -260px -75px;
    }

    .arrow-right {
      background-position: -300px -75px;
    }

    .album {
      width: 640px;
      height: 150px;

      .ant-carousel .slick-slide {
        height: 150px;
        overflow: hidden;
      }

      .page {
        display: flex !important;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
`
export const StyledPanel = styled.div`
  position: relative;
  height: 186px;
  background-color: #f5f5f5;
  border: 1px solid #d3d3d3;
`

export const StyledContent = styled.div`
  margin: 29px auto 0 auto;
  width: 645px;
`

export const StyledPage = styled.div`
  display: flex !important;
  justify-content: space-around;
`

export const StyledControl = styled.div`
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
`
