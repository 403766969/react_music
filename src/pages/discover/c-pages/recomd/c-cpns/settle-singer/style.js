import styled from 'styled-components'

export const StyledWrapper = styled.div`
  margin-bottom: 5px;
  padding: 20px 20px 0 20px;
`

export const StyledContent = styled.div`
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

export const StyledFooter = styled.div`
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
