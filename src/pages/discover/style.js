import styled from 'styled-components'

export const DiscoverWrapper = styled.div`
  .partition {
    display: flex;
    align-items: center;
    height: 30px;
    background-color: #C20C0C;
  }

  .content {
    display: flex;
    align-items: center;
    position: relative;
    top: -2.5px;
    padding-left: 180px;

    .item {
      a {
        display: block;
        position: relative;
        margin: 5px 17px;
        padding: 0 13px;
        height: 20px;
        line-height: 20px;
        color: #fff;

        &:hover, &.active {
          text-decoration: none;
          background-color: #9B0909;
          border-radius: 20px;
        }
      }
    }

    .item:nth-of-type(3) {
      a::after {
        content: "";
        display: block;
        position: absolute;
        top: 2px;
        right: 5px;
        width: 8px;
        height: 8px;
        overflow: hidden;
        background: url(${require('@/assets/img/white-r-icon.png').default}) center/contain no-repeat;
      }
    }
  }
`
