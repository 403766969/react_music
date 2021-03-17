import styled from 'styled-components'

export const StyledWrapper = styled.div`
  &>.header {
    display: flex;
    height: 42px;
    border-bottom: 2px solid #c20c0c;

    .title {
      line-height: 32px;
      font-size: 24px;
      font-weight: normal;
      font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
      color: #333;
    }

    .links {
      display: flex;
      margin: 12px 0 0 20px;

      .item {
        .divider {
          margin: 0 12px;
          color: #ccc;
        }
        
        &:last-of-type .divider {
          display: none;
        }
      }
    }
  }

  &>.list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 20px;

    &>.item {
      padding: 0 0 30px 33px;

      &:nth-of-type(5n+1) {
        padding-left: 0;
      }

      .cpn-album-cover {
        .bottom-desc {
          .name {
            font-size: 14px;
            color: #000;
          }
        }
      }
    }
  }
`
