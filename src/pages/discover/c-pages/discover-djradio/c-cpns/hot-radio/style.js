import styled from 'styled-components'

export const StyledWrapper = styled.div`
  margin-top: 34px;

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

    .item {
      display: flex;
      align-items: center;
      margin-left: 30px;
      padding: 20px 0;
      width: 435px;
      height: 120px;
      border-bottom: 1px solid #e7e7e7;
      box-sizing: content-box;

      &:nth-child(2n+1) {
        margin-left: 0;
      }

      .cover {
        width: 120px;
        height: 120px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .text {
        margin-left: 20px;
        width: 295px;

        .name {
          height: 24px;
          line-height: 24px;

          .link {
            font-size: 18px;
            font-weight: bold;
            color: #333;
          }
        }

        .dj {
          position: relative;
          margin-top: 20px;
          padding-left: 22.5px;
          height: 20px;
          line-height: 20px;

          .icon {
            display: block;
            position: absolute;
            top: 50%;
            left: 0;
            width: 14px;
            height: 15px;
            background-position: -50px -300px;
            transform: translateY(-50%);
          }

          .link {
            color: #333;
          }
        }

        .count {
          margin-top: 6px;
          color: #999;

          .subCount {
            margin-left: 13.5px;
          }
        }
      }
    }
  }
`
