import styled from 'styled-components'

export const StyledWrapper = styled.div`
  padding: 40px;
  background-color: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #c20c0c;

    .hot {
      width: 46px;
      height: 29px;
      line-height: 29px;
      color: #fff;
      text-align: center;
      background-position: 0 0;
      border-radius: 3px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .content-i {
    padding-top: 30px;
  }

  .footer {
    padding: 20px 0;
  }
`
