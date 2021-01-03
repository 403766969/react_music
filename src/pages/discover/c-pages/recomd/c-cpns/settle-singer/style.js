import styled from 'styled-components'

export const SettleSingerWrapper = styled.div`
  margin-bottom: 5px;
  padding: 20px 20px 0 20px;
`

export const SettleSingerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;

  h3 {
    font-size: 12px;
    font-weight: bold;
    color: #333;
  }
`

export const SettleSingerContent = styled.div`
  .item {
    display: flex;
    margin-top: 14px;
    height: 62px;
    text-decoration: none;
    background-color: #fafafa;
    border: 1px solid #e9e9e9;

    :hover {
      background-color: #f4f4f4;
    }

    img {
      width: 62px;
      height: 62px;
    }

    .info {
      margin: 8px 0 0 10px;

      .title {
        font-size: 14px;
        font-weight: 700;
        color: #333;
      }

      .name {
        margin-top: 5px;
      }
    }
  }
`

export const SettleSingerFooter = styled.div`
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
`
