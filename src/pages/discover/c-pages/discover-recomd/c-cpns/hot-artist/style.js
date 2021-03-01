import styled from 'styled-components'

export const StyledWrapper = styled.div`
  margin-bottom: 5px;
  padding: 20px 20px 0 20px;

  .content {
    .item {
      margin-top: 14px;
      height: 62px;

      .link {
        display: flex;
        height: 62px;
        text-decoration: none;

        .image {
          width: 62px;
          height: 62px;        
        }

        .info {
          flex: 1;
          padding: 8px 14px 0 14px;
          width: 0;
          height: 62px;
          background-color: #fafafa;
          border: 1px solid #e9e9e9;
          border-left: none;

          &:hover {
            background-color: #f4f4f4;
          }

          .name {
            font-size: 14px;
            font-weight: 700;
            color: #333;           
          }

          .alias {
            margin-top: 7px;
          }
        }
      }
    } 
  }

  .footer {
    margin-top: 12px;

    a {
      display: block;
      height: 31px;
      line-height: 31px;
      font-weight: 700;
      text-align: center;
      text-decoration: none;
      color: #333;
      background-color: #fafafa;
      border: 1px solid #c3c3c3;
      border-radius: 4px;
    }
  }
`
