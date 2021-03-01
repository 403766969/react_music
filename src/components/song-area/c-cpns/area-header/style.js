import styled from 'styled-components'

export const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  border-bottom: 2px solid #c20c0c;

  .left {
    display: flex;

    .title {
      font-size: 20px;
      font-weight: normal;
      color: #333;
    }

    .count {
      margin: 9px 0 0 20px;
      color: #666;
    }
  }

  .right {
    display: flex;
    align-items: center;

    .link {
      margin-right: 20px;

      i {
        display: inline-block;
        width: 16px;
        height: 16px;
        background-position: -34px -863px;
        vertical-align: middle;
      }

      a {
        color: #0c73c2;
        text-decoration: underline;
      }
    }

    .count {
      color: #666;

      span {
        font-weight: bold;
        color: #c20c0c;
      }
    }
  }
`
