import styled from 'styled-components'

export const StyledWrapper = styled.div`
  height: 700px;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;

  .bg {
    position: relative;
    width: 902px;
    height: 414px;
    margin: 0 auto;
    padding-top: 70px;
    background: url(${require('@/assets/img/notlogin.jpg').default}) 0 70px no-repeat;
    box-sizing: content-box;

    .text {
      position: absolute;
      top: 248px;
      left: 535px;
      line-height: 23px;
      font-size: 14px;
      color: #666;
    }

    .login {
      display: block;
      position: absolute;
      bottom: 106px;
      right: 210px;
      width: 157px;
      height: 48px;
      text-indent: -9999px;
      background: url(${require('@/assets/img/notlogin.jpg').default}) 0 -9999px no-repeat;
      cursor: pointer;

      &:hover {
        background-position: 0 -430px;
      }
    }
  }
`
