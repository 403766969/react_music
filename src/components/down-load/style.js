import styled from 'styled-components'

export const StyleWrapper = styled.div`
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0 27px 0;

    .icon a {
      display: block;
      width: 100%;
      height: 100%;
      text-indent: -9999px;
    }

    .apple {
      width: 42px;
      height: 48px;
      background-position: 0 -392px;

      &:hover {
        background-position: 0 -472px;
      }
    }

    .pc {
      width: 60px;
      height: 48px;
      background-position: -72px -392px;

      &:hover {
        background-position: -72px -472px;
      }
    }

    .android {
      width: 42px;
      height: 48px;
      background-position: -158px -392px;

      &:hover {
        background-position: -158px -472px;
      }
    }
  }

  p {
    text-align: center;
    color: #999;
  }
`
