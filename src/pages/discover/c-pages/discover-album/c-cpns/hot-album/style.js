import styled from 'styled-components'

export const StyledWrapper = styled.div`
  &>.header {
    height: 42px;
    border-bottom: 2px solid #c20c0c;

    .title {
      line-height: 32px;
      font-size: 24px;
      font-weight: normal;
      font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
      color: #333;
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
