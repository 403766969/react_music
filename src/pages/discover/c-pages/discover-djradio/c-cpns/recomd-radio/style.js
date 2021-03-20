import styled from 'styled-components'

export const StyledWrapper = styled.div`
  margin-top: 20px;

  .header {
    height: 42px;
    border-bottom: 2px solid #c20c0c;

    .title {
      line-height: 32px;
      font-size: 24px;
      font-weight: normal;
      font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
    }
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 16px;

    .item {
      margin-left: 37px;
      width: 150px;

      &:nth-child(5n+1) {
        margin-left: 0;
      }

      .cover {
        width: 100%;
        height: 150px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .name {
        margin-top: 13px;
        line-height: 16px;
        
        .link {
          font-size: 14px;
          color: #333;
        }
      }

      .desc {
        margin-top: 6px;
        line-height: 18px;
        color: #999;
      }
    }
  }
`
