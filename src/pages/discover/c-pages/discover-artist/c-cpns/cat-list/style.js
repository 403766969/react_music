import styled from 'styled-components'

export const StyledWrapper = styled.div`
  .content {
    margin-bottom: 16px;
    padding-bottom: 5px;
    border-bottom: 1px solid #d3d3d3;

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;      
    }

    .title {
      margin-bottom: 2px;
      padding-left: 14px;
      height: 25px;
      line-height: 25px;
      font-size: 16px;
      font-weight: bold;
      font-family: "Microsoft Yahei";
    }

    .list {
      .sub {
        margin-bottom: 2px;
        background: url(${require('@/assets/img/singer.png').default}) 0 -30px no-repeat;

        .link {
          display: block;
          padding-left: 27px;
          width: 160px;
          height: 29px;
          line-height: 29px;
          color: #333;
        }

        &.active {
          background-position: 0 0;

          .link {
            text-decoration: none;
            color: #c20c0c;
          }
        }
      }
    }
  }
`
